import { GetUserDTO } from '../domain/dtos/users.getByIdDto'
import { UserRepository } from '../domain/repositories/users.repository'

export class GetUserByIdUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(id: string):Promise<GetUserDTO | undefined> {
    const user = await this.repository.getUserById(id)
    
    return user
  }
}
