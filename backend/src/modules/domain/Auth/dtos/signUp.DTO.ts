import { z } from 'zod'

// REQUEST DTO

export interface SignUpDto {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const SignUpDtoSchema = z.object({
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

// RESPONSE DTO

export interface SignUpResponseDto {
  firstName: string,
  lastName: string,
  email: string,
}

export const SignUpDtoResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

