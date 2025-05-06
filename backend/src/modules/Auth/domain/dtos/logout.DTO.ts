import { z } from "zod"


// Request DTO 
export interface LogoutDto {}

export const LogoutDtoSchema = z.object({})


// Response DTO
export interface LogoutResponseDto {
  message: string
}

export const LogoutResponseDtoSchema = z.object({
  message: z.string()
})
