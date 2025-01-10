import { UserRepository } from '../../../Users/domain/repositories/users.repository'
import { UsersCreateDto } from '../../../Users/domain/dtos/users.createDto'
import { User } from '../../../Users/domain/entities/users.entity'

export class VerifyToken {
  private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  
  /* constructor (repository: UserRepository) {
    this.repository = repository
  } */

  async execute(token, accessTokenSecret){
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.error(`No se pudo crear el usuario. Error en execute(): ${error}`)
    }
  }
}
