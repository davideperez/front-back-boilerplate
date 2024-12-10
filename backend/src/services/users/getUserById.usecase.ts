import { UserRepository } from '../../domain/repositories/users.repository'
import { User } from '../../domain/entities/users.entity'

export class GetUserByIdUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(id: number):Promise<User | undefined> {
    const user = await this.repository.getUserById(id)
    return user
  }
}