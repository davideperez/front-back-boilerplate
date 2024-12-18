// Es un adapter, es un proxy que encapsula una implementacion
// 
import { UserRepository } from '../../domain/repositories/users.repository'
import { UsersCreate } from '../../domain/dtos/users/users.createDto'

export class CreateUserUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UsersCreate){
    try {
      // const userAdaptado = separarNombreyApellido(user)
      this.repository.createUser(user)
    } catch (error) {
      console.error(`No se pudo crear el usuario. Error en execute(): ${error}`)
    }
  }
}
