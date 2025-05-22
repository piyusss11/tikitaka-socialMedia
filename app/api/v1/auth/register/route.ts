import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { validateUserRegistration } from "@/utils/zod/user.zod";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, username } = await req.json();
    const userInfo = { email, password, name, username };
    const validatedUserInfo = validateUserRegistration(userInfo);
    if (!validatedUserInfo.success) {
      return NextResponse.json(
        {
          error: "invalid user info",
          details: validatedUserInfo.error.flatten(),
        },
        { status: 400 }
      );
    }
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: "email,password,name,username are required." },
        { status: 400 }
      );
    }
    await dbConnect();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "email already registered." },
        { status: 400 }
      );
    }
    await User.create({ email, password, name, username });
    return NextResponse.json(
      { message: "user created successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to register user." },
      { status: 500 }
    );
  }
}
