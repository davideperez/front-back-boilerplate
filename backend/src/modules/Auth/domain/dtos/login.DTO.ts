import { z } from "zod"

// Request DTO

export interface LoginDto {
  email: string,
  password: string,
}

export const LoginDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
 })

// Response DTO

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export const LoginResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

