import { Request, Response } from 'express';

import { GetUserByIdUseCase } from '../../services/User/getUserById.usecase';
import { FindUserByEmailUseCase } from '../../services/User/findUserByEmail.usecase';
import { GetAllUsersUseCase } from '../../services/User/getAllUsers.usecase';
import { UpdateUserByIdUseCase } from '../../services/User/updateUser.usecase';
import { DeleteUserByIdUseCase } from '../../services/User/deleteUserById.usecase';

export class ExpressUsersController {

  private readonly getUserByIdUseCase: GetUserByIdUseCase
  private readonly findUserByEmailUseCase: FindUserByEmailUseCase
  private readonly getAllUsers: GetAllUsersUseCase
  private readonly updateUserById: UpdateUserByIdUseCase
  private readonly deleteUserById: DeleteUserByIdUseCase

  constructor (input: {
    readonly getUserByIdService: GetUserByIdUseCase,
    readonly findUserByEmailService: FindUserByEmailUseCase,
    readonly getAllUsersService: GetAllUsersUseCase,
    readonly updateUserByIdService: UpdateUserByIdUseCase,
    readonly deleteUserByIdService: DeleteUserByIdUseCase,
  } 

  ) {
    this.getUserByIdUseCase = input.getUserByIdService
    this.findUserByEmailUseCase = input.findUserByEmailService
    this.getAllUsers = input.getAllUsersService
    this.updateUserById = input.updateUserByIdService
    this.deleteUserById = input.deleteUserByIdService
  }

  httpGetUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1 Extract the data
      const userId = req.params.id;

      // 2 Validate the data

      // 3 Call the usecase. 
      const user = await this.getUserByIdUseCase.execute(userId)

      // 4 Handle usecase exception.
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // 5 Response
      res.status(200).json(user)
    } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
    }
  };

  httpFindUserByEmail = async (req: Request, res: Response): Promise<void>  => {

  }

  httpGetAllUsers = async (req: Request, res: Response): Promise<void>  => {
    try {
      // 1 Extract the query params.
      const { search, page = 1, items = 10 } = req.query; // TODO: Are the default a good practice?
      
      // 2 Validate the types of the query.
      const searchTerm = typeof search === 'string' ? search : '';  // Asignar cadena vacía si no es una cadena
      const pageNumber = typeof page === 'string' ? +page : 1;  
      const itemsPerPage = typeof items === 'string' ? +items : 10;

      // 3 Call the getAll use case.
      const allUsers = await this.getAllUsers.execute(+pageNumber, +itemsPerPage, searchTerm)
      
      // 4 Send the response.
      res.status(200).json(allUsers);
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

      // 2 Se extrae la data actualizada del body http.
      const updatedData = req.body
      
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

