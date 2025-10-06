import { z } from "zod"

const phoneRegex = /^\+?[0-9]{10,15}$/

export const loginSchema = z
  .object({
    identifier: z
      .string()
      .trim()
      .min(1, "Email or phone is required")
      .refine((val) => /\S+@\S+\.\S+/.test(val) || phoneRegex.test(val), "Enter a valid email address or phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    remember: z.boolean().optional().default(false),
  })
  .strict()

export type LoginInput = z.infer<typeof loginSchema>

export const socialProviders = z.enum(["google", "facebook"])
export type SocialProvider = z.infer<typeof socialProviders>
