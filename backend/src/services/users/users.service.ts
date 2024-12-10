// BORRAR ARCHIVO
import { UserRepository } from '../../domain/repositories/users.repository'
import { User } from '../../domain/entities/users.entity'

export class UserService {
  repository: UserRepository
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async getUserById(id: number):Promise<User | undefined> {
    const user = await this.repository.getUserById(id)

    // .find( user => user.id === id) // usar una funcion que venga de un repository.
    return user
  }
}

/* export async function getAllUsers(){
  console.log('Hi from the getAllUsers function')
  return users
}

export async function updateUserById(id: number){
  console.log('Hi from the updateUserById function, and this is the id:', id)

}
export async function deleteUserById(){
  console.log('Hi from the deleteUserById function')
}

 */