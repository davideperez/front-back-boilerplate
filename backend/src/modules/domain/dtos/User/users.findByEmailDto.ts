export interface FindUserByEmailDto {
  id: string,
  email: string;
  password: string;
  refreshTokens: Array<string>
}
