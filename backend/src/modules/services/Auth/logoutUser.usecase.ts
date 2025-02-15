// Es un adapter, es un proxy que encapsula una implementacion
import { Error } from 'mongoose'

// El caso de uso es llamdo por el controlador, para registrar un usuario.
export class LogoutUseCase {

  async execute(user: UserLogoutDto): Promise<UserLogoutResponseDto>  {

    // 1 Extract the data

    // 2 Validate the data
    
    // 3 

    // 4 Save the refresh token to the db.
    
    try {
    
    // 5 Send the response

    } catch (error) {
      console.error(`Error al intentar loguearse ${error}`)
      throw new Error('Error al intentar loguearse.')
    }
  }
}
