import { User } from '../entities/users.entity'
import { UsersCreate } from '../models/users.createDto'
import { GetAllUsersDTO } from '../models/users.getAllDto'

export interface UserRepository {
  getUserById (id: number):Promise<User | undefined>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | undefined>,
  createUser (user: UsersCreate): void,
}