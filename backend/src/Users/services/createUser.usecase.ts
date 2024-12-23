// Es un adapter, es un proxy que encapsula una implementacion
// 
import { UserRepository } from '../domain/repositories/users.repository'
import { UsersCreateDto } from '../domain/dtos/users.createDto'
import { Error } from 'mongoose'
import { UserErrorFieldsMissing } from '../domain/errors/user.error.fieldsMissing'

export class CreateUserUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UsersCreateDto): Promise<void>  {
    // 1 Validar que lleguen todos los campos
    
    if (!user.email || !user.password || !user.firstName || !user.lastName) {
      throw new UserErrorFieldsMissing()
    }

    try {
      this.repository.createUser(user)
    } catch (error) {
      console.error(`No se pudo crear el usuario: ${error}`)
      
      // throw new Error('No se pudo crear el usuario 💡')
    }
  }
}
