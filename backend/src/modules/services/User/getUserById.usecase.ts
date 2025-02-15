import { GetUserDTO } from '../../domain/dtos/User/users.getByIdDto'
import { UserRepository } from '../domain/repositories/users.repository'

export class GetUserByIdUseCase {
  private repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(id: string):Promise<GetUserDTO | null> {
    const user = await this.repository.getUserById(id)
    return user
  }
}

