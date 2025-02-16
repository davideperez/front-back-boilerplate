import { User } from "../entities/user.entity";

export interface GetUserDTO extends Partial<User> {
  firstName?: string;
  lastName?: string;
  email?: string;
}
