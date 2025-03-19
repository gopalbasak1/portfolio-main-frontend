import { z } from "zod";

// Validation Schema
export const loginSchema = z.object({
  email: z.string({ required_error: "Email  number is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});
