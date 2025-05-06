// Es un adapter, es un proxy que encapsula una implementacion
import { Error } from 'mongoose'
import { GetUserByIdUseCase } from '../../Users/usecases/getUserById.usecase'
import { LogoutResponseDto } from '../domain/dtos/logout.DTO'

// El caso de uso es llamdo por el controlador, para registrar un usuario.
export class LogoutUseCase {
/*   private GetUserByIdUSeCase: GetUserByIdUSeCase

  constructor (GetUserByIdUSeCase: GetUserByIdUSeCase) {
    this.GetUserByIdUSeCase = GetUserByIdUSeCase
  } */

  async execute(LogoutDto: any): Promise<LogoutResponseDto>  {

    // 1 Extract the data

    // 2 Validate the data
    
    // 3 
    // const user = await this.GetUserByIdUSeCase.execute(id)
    // 4 Save the refresh token to the db.
    
    try {
    
    // 5 Send the response
    return { message: "Logout Succesfully done." }
    } catch (error) {
      console.error(`Error al intentar loguearse ${error}`)
      throw new Error('Error al intentar loguearse.')
    }
  }
}
