import { User } from '../entities/user.entity'
import { UserCreateDto } from '../dtos/create/users.createDto'
import { UpdatedUserDto } from '../dtos/users.updateDto'
import { GetAllUsersDTO } from '../dtos/users.getAllDto'
import { GetUserDTO } from '../dtos/users.getByIdDto'
import { FindUserByEmailDto } from '../dtos/read/users.findByEmailDto'
import { UserCreateResponseDto } from '../dtos/create/users.createResponseDto'

export interface UserRepository {
  createUser(user: UserCreateDto) : Promise<UserCreateResponseDto | null>,
  getUserById (id: string):Promise<GetUserDTO | null>,
  findUserByEmail (email: string):Promise<FindUserByEmailDto | null>,
  userExists (email: string):Promise<Boolean>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | null>,
  updateUserById (id: string, user: UpdatedUserDto): Promise<User | null>
  deleteUserById (id: string): Promise<User | null>
}
