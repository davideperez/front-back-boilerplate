import { User } from "../../entities/users.entity";

export interface UpdatedUserDto extends Partial<User> { // TODO: Esta ok esto?
  firstName?: string;
  lastName?: string;
  email?: string;
}
