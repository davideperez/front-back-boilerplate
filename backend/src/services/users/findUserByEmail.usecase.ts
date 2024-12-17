import { UserRepository } from '../../domain/repositories/users.repository'
import { LoginUserDto } from '../../domain/dtos/users/users.loginDto'

export class FindUserByEmailUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(email: string):Promise<LoginUserDto | undefined> {
    const user = await this.repository.findUserByEmail(email)
    
    return user
  }
}
