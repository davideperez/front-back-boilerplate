// Este es un port, porque tiene la forma, el contrato
// y no la logica (como si tuene por ej la clase GetAllUsersUseCase.
import { User } from '../entities/users.entity'
import { UsersCreateDto } from '../dtos/users.createDto'
import { GetAllUsersDTO } from '../dtos/users.getAllDto'
import { GetUserDTO } from '../dtos/users.getByIdDto'
import { UpdatedUserDto } from '../dtos/users.updateDto'

import { FindUserByEmailDto } from '../dtos/users.findByEmailDto'

// TODO: Para que se define el entity si al final son todos dtos parciales. 
//       Para que operacion se usa el user entity completo?
//       Esta bien o, puede pasar que el User entity no se usa nunca en su version completa?
export interface UserRepository {
  createUser (user: UsersCreateDto): Promise<void>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | undefined>,
  getUserById (id: string):Promise<GetUserDTO | undefined>,
  findUserByEmail (email: string):Promise<FindUserByEmailDto | undefined>,
  updateUserById (id: string, user: UpdatedUserDto): Promise<User | undefined>
  deleteUserById (id: string): Promise<User | undefined>
}
