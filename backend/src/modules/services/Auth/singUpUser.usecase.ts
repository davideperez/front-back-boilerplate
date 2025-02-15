// Es un adapter, es un proxy que encapsula una implementacion
import { UserRepository } from '../domain/repositories/users.repository'
import { UserSignUpResponseDto } from '../../domain/dtos/Auth/users.signUpResponseDto'
import { UserSignUpDto, UserSignUpDtoSchema } from '../../domain/dtos/Auth/users.signUpDto'
import { Error } from 'mongoose'
import { PasswordHasher } from '../../infrastructure/Auth/passwordHasher'

// El caso de uso es llamdo por el controlador, para registrar un usuario.
export class SignUpUseCase {
  repository: UserRepository

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute(user: UserSignUpDto): Promise<UserSignUpResponseDto>  { // TODO: revisar si agregar el null.
    
    // 1 Validar que el user tenga todas los atributos con zod.
    const userSchema = UserSignUpDtoSchema.safeParse(user)
    
    if (!userSchema.success) {
      console.error('Validation errors: ', userSchema.error.issues);
      throw new Error(`Validation failed: ${JSON.stringify(userSchema.error.issues)}`)
    }

    // 2 Validar que el usuario no exista.
    const userExists = await this.repository.findUserByEmail(userSchema.data.email)

    if (userExists) {
      throw new Error('El usuario ya existe')
    }

    // 3 Hashear la contraseña
    const userToSignUp = {
      ...userSchema.data,
      password: await PasswordHasher.hash(userSchema.data.password)
    }

    // 4 Crear al usuario en la base de datos
    try {
      const newUser = await this.repository.createUser(userToSignUp)

      if (!newUser) {
        throw new Error('Error inesperado: No se pudo crear el usuario.')
      }

       // 4 Crear la respuesta del usuario creado.
       const newUserResponse: UserSignUpResponseDto = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email        
      }

    // 5 Realizar el usuario creado.
      return newUserResponse
    } catch (error) {
      console.error(`No se pudo crear el usuario: ${error}`)
      throw new Error('No se pudo crear el usuario 💡')
    }
  }
}
