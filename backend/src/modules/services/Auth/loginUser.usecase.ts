// Es un adapter, es un proxy que encapsula una implementacion
import { LoginDto , LoginDtoSchema } from '../../domain/dtos/Auth/login.DTO'
import { LoginResponseDto } from '../../domain/dtos/Auth/login.DTO'
import { UpdateUserByIdUseCase } from '../User/updateUser.usecase'

import { Error } from 'mongoose'
import { PasswordHasher } from '../../infrastructure/Auth/passwordHasher'
import { JwtUtil } from '../../infrastructure/Auth/jwt.util'
import { FindUserByEmailUseCase } from '../User/findUserByEmail.usecase'

// El caso de uso es llamdo por el controlador, para registrar un usuario.
export class LoginUseCase {

  private UpdateUserByIdUseCase: UpdateUserByIdUseCase
  private FindUserByEmailUseCase: FindUserByEmailUseCase

  constructor (UpdateUserByIdUseCase: UpdateUserByIdUseCase, FindUserByEmailUseCase: FindUserByEmailUseCase) {
    this.UpdateUserByIdUseCase = UpdateUserByIdUseCase
    this.FindUserByEmailUseCase = FindUserByEmailUseCase
  }

  async execute(user: LoginDto): Promise<LoginResponseDto>  {

    // 1 Validate the user attributes
    const userSchema = LoginDtoSchema.safeParse(user)

    if (!userSchema.success) {
      console.error('Invalid errors: ', userSchema.error.issues);
      throw new Error(`Invalid user: ${JSON.stringify(userSchema.error.issues)}`)
    }

    // 2 Validate user exists
    const userExists = await this.FindUserByEmailUseCase.execute(userSchema.data.email)

    if (!userExists) {
      throw new Error('User not found.')
    }
    
    // 3 Compare the passwords
    const { id, password } = userExists
    const autenticatedUser = await PasswordHasher.compare(user.password, password)
    
    if (!autenticatedUser) {
      throw new Error('Wrong password.')
    }

    // 4 Generate the Tokens
    const accessToken = JwtUtil.generateAccessToken(userExists)
    const refreshToken = JwtUtil.generateRefreshToken(userExists.id)
    
    // 5 Save the refresh token to the db.
    userExists.refreshTokens.push(refreshToken)
    await this.UpdateUserByIdUseCase.execute(id, userExists)
    
    try {
    
    // 6 Send the response
    const response = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
    
    return response;

    } catch (error) {
      console.error(`Error al intentar loguearse ${error}`)
      throw new Error('Error al intentar loguearse.')
    }
  }
}
