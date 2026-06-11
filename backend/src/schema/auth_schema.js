import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name too short"),
  email: z.string().trim().email("Invalid email").toLowerCase(),
  password: z.string().trim().min(6, "Password too short"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").toLowerCase(),
  password: z.string().trim().min(1, "Password required"),
});