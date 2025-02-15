import { FindUserByEmailDto } from '../../domain/dtos/User/users.findByEmailDto'
import { UserRepository } from '../domain/repositories/users.repository'

export class FindUserByEmailUseCase {
  private repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(email: string):Promise<FindUserByEmailDto | null> {
    //TODO: Add validations and Error handling.
    const user = await this.repository.findUserByEmail(email)
    
    return user
  }
}
