import { z } from 'zod'

export interface UserSignUpResponseDto {
  firstName: string,
  lastName: string,
  email: string,
}

export const UserSignUpDtoResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

