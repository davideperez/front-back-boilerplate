import { Request, Response } from 'express'
import { GetUserByIdUseCase } from '../../services/users/getUserById.usecase'
import { CreateUserUseCase } from '../../services/users/createUser.usecase';
import { GetAllUsersDTO } from '../../domain/models/users.getAllDto';
import { GetAllUsersUseCase } from '../../services/users/getAllUsers.usecase';

export class UserController {
  constructor (
    private readonly getUserByIdUseCase: GetUserByIdUseCase, 
    private readonly createUser: CreateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
  ) {}
  
  httpAddNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body
      const newUser = await this.createUser.execute(user)
      res.status(200).json(newUser)
    } catch (err: any) {
        console.error(`No se pudo crear el usuario desde UserController: ${err.message}`)  
        res.status(500).json({
          error: err.message
        })
    }
  };

   httpGetAllUsers = async (req: Request, res: Response): Promise<void>  => {
    try {
      console.log('users.controller.ts > httpGetAllUsers > req.query: ', req.query)
      const { search, page = 1, items = 10 } = req.query; //TBD es buena practica esos defaults?
      
      // 1. Se valida que 'search' sea una string
      const searchTerm = typeof search === 'string' ? search : '';  // Asignar cadena vacía si no es una cadena

      // 2. Se valida que 'page' y 'items' sean números
      const pageNumber = typeof page === 'string' ? +page : 1;  
      const itemsPerPage = typeof items === 'string' ? +items : 10;

      // 3. Se hace el fetch a la db
      const allUsers = await this.getAllUsers.execute(+pageNumber, +itemsPerPage, searchTerm)
      res.status(200).json(allUsers);
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
  };

  httpGetUser = async (req: Request, res: Response): Promise<void> => {
    try {
      
      // 1 Retrieves the id from the reques and
      const userId = req.params.id;

      // 2 Converts the id to number.
      const validUserId = parseInt(userId, 10);

      // 3 Validates the id is in fact a number.
      if (isNaN(validUserId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      // 4 Fetches the id from the db
      const user = await this.getUserByIdUseCase.execute(validUserId)

      // 5.1 If the user does not exists.
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // 5.2 If success
      res.status(200).json(user)
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }
  };
/* 
  async httpUpdateUser (req: Request, res: Response): Promise<void> {
    try {
      
      // 1 Retrieves the id from the reques and
      const userId = req.params.id;

      // 2 Converts the id to number.
      const validUserId = parseInt(userId, 10);

      // TBD
      const updatedUser = await updateUserById(validUserId)
      res.status(200).json(updatedUser)
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        })
    }    
  }

  async  httpDeleteUser (req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await deleteUserById()
      res.status(200).json(deletedUser)
      } catch (err: any) {
        res.status(500).json({
          error: err.message,
        });
      }
  }
 */
}