import { IUser } from "@/models/User";
import { IVideo } from "@/models/Video";
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

export function validateUserRegistration(userInfo: IUser) {
  return userRegisterSchema.safeParse(userInfo);
}
const videoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  videoUrl: z.string().url("Invalid video URL"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL"),
  dimensions: z.object({
    height: z.number().positive("Height must be a positive number"),
    width: z.number().positive("Width must be a positive number"),
    quality: z
      .number()
      .min(0, "Quality must be between 0 and 100")
      .max(100, "Quality must be between 0 and 100"),
  }),
});

export function validateVideo(videoInfo: IVideo) {
  return videoSchema.safeParse(videoInfo);
}
