import { UserRepository } from '../domain/repositories/users.repository'
import { GetAllUsersDTO } from '../domain/dtos/users.getAllDto'

export class GetAllUsersUseCase {
  repository: UserRepository
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(page: number, items: number, search: string):Promise<GetAllUsersDTO | undefined> {
    const allUser = await this.repository.getAllUsers(page, items, search)
    return allUser
  }
}