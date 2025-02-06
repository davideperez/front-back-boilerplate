// Es un adapter, es un proxy que encapsula una implementacion
import { UserRepository } from '../domain/repositories/users.repository'
import { UserLoginDto , UserLoginDtoSchema } from '../domain/dtos/users.loginDto'
import { Error } from 'mongoose'
import { PasswordHasher } from '../../../utils/passwordHasher'

// El caso de uso es llamdo por el controlador, para registrar un usuario.
export class LoginUseCase {
  repository: UserRepository

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UserLoginDto): Promise<void>  {
    
    // 1 Valido que user tenga todas los atributos con zod.
    const userSchema = UserLoginDtoSchema.safeParse(user)
    if (!userSchema.success) {
      console.error('Validation errors: ', userSchema.error.issues);
      throw new Error(`Validation failed: ${JSON.stringify(userSchema.error.issues)}`)
    }

    // 2 Valida que el usuario no exista.
    const userExists = await this.repository.findUserByEmail(userSchema.data.email)
    if (userExists) {
      throw new Error('El usuario ya existe')
    }

    // 3 Hasheo la contraseña
    const userToSignUp = {
      ...userSchema.data,
      password: await PasswordHasher.hash(userSchema.data.password)
    }

    // 4 Creo el usuario
    try {
      // await this.repository.loginUser(userToSignUp)
    } catch (error) {
      console.error(`No se pudo crear el usuario: ${error}`)
      throw new Error('No se pudo crear el usuario 💡')
    }
  }
}
