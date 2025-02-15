import { User } from "../../entities/User/user.entity";

export interface UpdatedUserDto extends Partial<User> { // TODO: Esta ok esto?
  firstName?: string;
  lastName?: string;
  email?: string;
  refreshTokens?: Array<string>;
}
