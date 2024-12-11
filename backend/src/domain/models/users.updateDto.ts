import { User } from "../entities/users.entity";

export interface UpdatedUser extends Partial<User> {
  firstName?: string;
  lastName?: string;
  email?: string;
}
