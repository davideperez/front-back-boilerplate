import { User } from '../entities/User/user.entity'
import { UserCreateDto } from '../dtos/User/users.createDto'
import { UpdatedUserDto } from '../dtos/User/users.updateDto'
import { GetAllUsersDTO } from '../dtos/User/users.getAllDto'
import { GetUserDTO } from '../dtos/User/users.getByIdDto'
import { FindUserByEmailDto } from '../dtos/User/users.findByEmailDto'
import { UserCreateResponseDto } from '../dtos/User/users.createResponseDto'

export interface UserRepository {
  createUser(user: UserCreateDto) : Promise<UserCreateResponseDto | null>,
  getUserById (id: string):Promise<GetUserDTO | null>,
  findUserByEmail (email: string):Promise<FindUserByEmailDto | null>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | null>,
  updateUserById (id: string, user: UpdatedUserDto): Promise<User | null>
  deleteUserById (id: string): Promise<User | null>
}
