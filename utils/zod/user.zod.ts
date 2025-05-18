import { IUser } from "@/models/User";
import { z } from "zod";

const userRegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 50 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(10, "Username must be at most 20 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

export function validateUserREgistration(userInfo: IUser) {
  return userRegisterSchema.parse(userInfo);
}
