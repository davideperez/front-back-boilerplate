import { z } from 'zod'

export interface User {
  id?: string, // TODO: Este id esta ok ponerlo?: Xq entiendo que mongoose lo pone automaticamente..
  firstName: string,
  lastName: string,
  email: string,
  password: string,
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
})
