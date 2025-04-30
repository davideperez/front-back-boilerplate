import { z } from 'zod'

export interface UserCreateResponseDto {
  firstName: string,
  lastName: string,
  email: string,
}

export const UserCreateResponseDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})
