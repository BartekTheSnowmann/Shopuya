import * as z from "zod";

export const newUserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(50),
  email: z.string().min(4),
  imageUrl: z.string().min(4).optional(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(40),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(50),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(40),
});
