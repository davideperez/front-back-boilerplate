import { UserRepository } from '../domain/repositories/users.repository'
import { FindUserByEmailDto } from '../domain/dtos/users.findByEmailDto'

export class FindUserByEmailUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(email: string):Promise<FindUserByEmailDto | undefined> {
    const user = await this.repository.findUserByEmail(email)
    
    return user
  }
}
