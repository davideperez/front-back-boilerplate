import { z } from 'zod'

export interface User {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  refreshTokens: Array<string>
}

export const UserSchema = z.object({
  id: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"), // TODO: Revisar si este error va en este nivel de la arquitectura.
  refreshTokens: z.string().array()
})
