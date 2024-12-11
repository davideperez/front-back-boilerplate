import { User } from '../entities/users.entity'
import { UsersCreate } from '../models/users.createDto'
import { GetAllUsersDTO } from '../models/users.getAllDto'
import { UpdatedUser } from '../models/users.updateDto'

export interface UserRepository {
  getUserById (id: string):Promise<User | undefined>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | undefined>,
  createUser (user: UsersCreate): Promise<void>,
  updateUserById (id: string, user: UpdatedUser): Promise<User | undefined> 
  deleteUserById (id: string): Promise<User | undefined>
}
