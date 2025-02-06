import { z } from "zod";

export interface UserLoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export const UserLoginResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

