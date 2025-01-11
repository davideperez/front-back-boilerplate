/* 
  Un controller no tiene que ver con el dominio, todavia es web.
    Ej: Deserializa, convierte, si se sube archivo lo baja del request.
*/
import { Request, Response } from 'express'
import { GetUserByIdUseCase } from '../services/getUserById.usecase'
import { CreateUserUseCase } from '../services/createUser.usecase';
import { GetAllUsersUseCase } from '../services/getAllUsers.usecase';
import { UpdateUserByIdUseCase } from '../services/updateUser.usecase';
import { DeleteUserByIdUseCase } from '../services/deleteUserById.usecase';
import { UserErrorFieldsMissing } from '../domain/errors/user.error.fieldsMissing';
 
export class ExpressUsersController {
    // Propiedades

    private readonly createUser: CreateUserUseCase
    private readonly getUserByIdUseCase: GetUserByIdUseCase
    private readonly getAllUsers: GetAllUsersUseCase
    private readonly updateUserById: UpdateUserByIdUseCase
    private readonly deleteUserById: DeleteUserByIdUseCase
  constructor (input: {
      readonly createUserService: CreateUserUseCase,
      readonly getUserByIdService: GetUserByIdUseCase,
      readonly getAllUsersService: GetAllUsersUseCase,
      readonly updateUserByIdService: UpdateUserByIdUseCase,
      readonly deleteUserByIdService: DeleteUserByIdUseCase,
    }
  ) {
    // Propiedades en el objeto construido.
    this.createUser = input.createUserService
    this.getUserByIdUseCase = input.getUserByIdService
    this.getAllUsers = input.getAllUsersService
    this.updateUserById = input.updateUserByIdService
    this.deleteUserById = input.deleteUserByIdService
  }

  httpAddNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1 Se extrae el usuario del body http.
      const user = req.body
           
      // 2 Se crea el usuario en la base de datos, de manera agnostica.

      await this.createUser.execute(user) // Tipo pendiente??

      /* if(!newUser) {
        res.status(400).json({error: 'Error creating user'})
        return
      } */

      // 3 Se devuelve el usuario creado. TODO: Hace falta devolverlo?
      res.status(200).json({message: 'User created successfully'},)
    
    } catch (err: any) {
      let status: number;
      let message: string;

      if (err instanceof UserErrorFieldsMissing) {
        console.error(`Error al crear el usuario: ${err.message} 💊`)  
        status = 400;
        message = err.message;
      } else if (err instanceof Error) {
        console.error(`Error al crear el usuario: ${err.message}`);  
        status = 500;
        message = err.message;
      } else {
        status = 500;
        message = 'Unkown error';

        
      }
      
      res.status(status).json({error: message})
    }
  };

  httpGetAllUsers = async (req: Request, res: Response): Promise<void>  => {
    try {
      console.log('users.controller.ts > httpGetAllUsers > req.query: ', req.query)	
      //TODO: Pasar lo que es logica de negocio al usecase.
      const { search, page = 1, items = 10 } = req.query; // TODO: es buena practica esos defaults?
      
      // 1 Se valida que 'search' sea una string
      const searchTerm = typeof search === 'string' ? search : '';  // Asignar cadena vacía si no es una cadena

      // 2 Se valida que 'page' y 'items' sean números
      const pageNumber = typeof page === 'string' ? +page : 1;  
      const itemsPerPage = typeof items === 'string' ? +items : 10;

      // 3 Se hace el fetch a la db de manera agnostica.
      const allUsers = await this.getAllUsers.execute(+pageNumber, +itemsPerPage, searchTerm)
      
      // 4 Se envía la respuesta.
      res.status(200).json(allUsers);
    } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
    }
  };

  httpGetUser = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('users.controller.ts > httpGetUser > req.params.id: ', req.params.id)
      // 1 Se extrae el id de la url.
      const userId = req.params.id;

      // 2 Se realiza el fetch a la db de manera agnostica.
      const user = await this.getUserByIdUseCase.execute(userId)

      // 3 Se valida que exista el usuario.
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // 4 Se devuelve el usuario
      res.status(200).json(user)
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
  };

  httpUpdateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1 Se extrae el id de la url.
      const id = req.params.id
      console.log('users.controller.ts > httpUpdateUser > req.params.id: ', req.params.id)

      // 2 Se extrae la data actualizada del body http.
      const updatedData = req.body
      console.log('users.controller.ts > httpUpdateUser > req.params.id: ', req.body)
      
      // 3 Se hace fetch agnostico del usuario a actualizar.
      const existingUser = await this.getUserByIdUseCase.execute(id);
            
      // 4 Se Valida que haya usuario a actualizar.
      if (!existingUser) {
        throw new Error('User not found');
      }

      // 5 Se hace el update de la data del usuario.
      // TODO: Esta logica no iria en el usecase?
      const updatedUser = {
        ...existingUser,
        ...updatedData,
      };

      // 6 Se guarda de manera agnostica el nuevo usuario en la db.
      await this.updateUserById.execute(id, updatedUser);
      
      // 7 Se retorna el usuario.
      // TODO: Hace falta retornarlo?
      res.status(200).json(updatedUser)
    } catch (error) {
      console.error(`Error updating user :`, error);
    } 
  }
  
  httpDeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Extract user ID from the request parameters
      const userId = req.params.id;
  
      // 2. Perform deletion using the use case
      const wasDeleted = await this.deleteUserById.execute(userId);
  
      // 3. Handle case where the user does not exist
      if (!wasDeleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      // 4. Respond with success message
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
      // 5. Handle unexpected errors
      console.error(`Error deleting user: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  };
}
