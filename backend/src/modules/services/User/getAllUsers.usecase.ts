import { UserRepository } from '../domain/repositories/users.repository'
import { GetAllUsersDTO } from '../../domain/dtos/User/users.getAllDto'

export class GetAllUsersUseCase {
  private repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(page: number, items: number, search: string):Promise<GetAllUsersDTO | null> {
    // TODO: Complete with validations and erros.
    const allUser = await this.repository.getAllUsers(page, items, search)
    return allUser
  }
}