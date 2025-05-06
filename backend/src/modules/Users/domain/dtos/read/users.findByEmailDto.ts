export interface FindUserByEmailDto { // TODO: Check if this DTO is really necesary, perhaps we can use the User DTO directly.
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshTokens: Array<string>
}
