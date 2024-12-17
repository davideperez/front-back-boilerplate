import { UserRepository } from '../../domain/repositories/users.repository'
import { UsersCreate } from '../../domain/dtos/users/users.createDto'
import { User } from '../../domain/entities/users.entity'

export class GenerateRefreshToken {
  private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  
  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UsersCreate){
    try {
      this.repository.createUser(user)
    } catch (error) {
      console.error(`No se pudo crear el usuario. Error en execute(): ${error}`)
    }
  }
}

/* generateRefreshToken(user: User): string {
  return jwt.sign({ id: user.id }, this.refreshTokenSecret, { expiresIn: '7d' });
} */