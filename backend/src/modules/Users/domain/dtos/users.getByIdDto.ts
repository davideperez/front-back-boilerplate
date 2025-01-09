import { User } from "../entities/users.entity";

export interface GetUserDTO extends Partial<User> {
  firstName?: string;
  lastName?: string;
  email?: string;
}
