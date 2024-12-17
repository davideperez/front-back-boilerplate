import { User } from "../../entities/users.entity";

export interface GetUser extends Partial<User> {
  firstName?: string;
  lastName?: string;
  email?: string;
}
