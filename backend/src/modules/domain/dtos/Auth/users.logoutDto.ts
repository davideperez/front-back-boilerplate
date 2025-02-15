import { z } from "zod"


// Request DTO 
export interface UserLogoutDto {}

export const UserLogoutDtoSchema = z.object({})


// Response DTO
export interface UserLogoutResponseDto {
  message: string
}

export const UserLogoutResponseDtoSchema = z.object({
  message: z.string()
})
