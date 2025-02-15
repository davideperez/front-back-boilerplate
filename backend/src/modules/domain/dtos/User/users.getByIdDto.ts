import { User } from "../../entities/User/user.entity";

export interface GetUserDTO extends Partial<User> {
  firstName?: string;
  lastName?: string;
  email?: string;
}
