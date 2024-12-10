import { UserRepository } from '../../domain/repositories/users.repository'
import { UsersCreate } from '../../domain/models/users.createDto'
import { User } from '../../domain/entities/users.entity'

export class CreateUserUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UsersCreate){
    try {
      this.repository.createUser(user)
    } catch (error) {
      console.error(`No se pudo crear el usuario. Error en execute(): ${error}`)
    }
  }
}
