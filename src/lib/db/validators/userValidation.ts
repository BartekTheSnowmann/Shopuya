import * as z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(50),
  password: z
    .string()
    .min(6, { message: "password must be at least 8 characters" })
    .max(40),
});
