// Este es un port, porque tiene la forma, el contrato
// y no la logica (como si tuene por ej la clase GetAllUsersUseCase.
import { User } from '../entities/users.entity'
import { LoginUserDto } from '../dtos/users/users.loginDto'
import { UsersCreate } from '../dtos/users/users.createDto'
import { GetAllUsersDTO } from '../dtos/users/users.getAllDto'
import { GetUser } from '../dtos/users/users.getByIdDto'
import { UpdatedUserDto } from '../dtos/users/users.updateDto'

// TODO: Para que se define el entity si al final son todos dtos parciales. 
//       Para que operacion se usa el user entity completo?
//       Esta bien o, puede pasar que el User entity no se usa nunca en su version completa?
export interface UserRepository {
  createUser (user: UsersCreate): Promise<void>,
  getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | undefined>,
  getUserById (id: string):Promise<GetUser | undefined>,
  findUserByEmail (email: string):Promise<LoginUserDto | undefined>,
  updateUserById (id: string, user: UpdatedUserDto): Promise<User | undefined>
  deleteUserById (id: string): Promise<User | undefined>
}
