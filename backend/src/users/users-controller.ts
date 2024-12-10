import { Request, Response } from 'express'
import {    
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from './users-service'

export async function httpAddNewUser(req: Request, res: Response): Promise<void> {
  try {
    console.log('Hi from the Create User controller')
    console.log('req.body: ', req.body)
    const newUser = await createUser(req.body)
    res.status(200).json(newUser)
  } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
  }
};

export async function httpGetAllUsers(req: Request, res: Response): Promise<void> {
  try {
    console.log('Hi from the Get All Users controller')
    const allUsers = await getAllUsers()
    res.status(200).json(allUsers)
  } catch (err: any) {
      res.status(500).json({
          error: err.message,
      })
  }
};

export async function httpGetUser(req: Request, res: Response): Promise<void> {
  try {
    console.log('Hi from the Get User controller')
    
    // 1 Retrieves the id from the reques and
    const userId = req.params.id;
    console.log('httpGetUser > req.params.id: ', req.params.id)

    // 2 Converts the id to number.
    const validUserId = parseInt(userId, 10);

    // 3 Validates the id is in fact a number.
    if (isNaN(validUserId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    // 4 Fetches the id from the db
    const user = await getUserById(validUserId)

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

export async function httpUpdateUser (req: Request, res: Response): Promise<void> {
  try {
    console.log('Hi from the Update User controller')
    
    // 1 Retrieves the id from the reques and
    const userId = req.params.id;
    console.log('httpGetUser > req.params.id: ', req.params.id)

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

export async function httpDeleteUser (req: Request, res: Response): Promise<void> {
  try {
    console.log('Hi from the Delete User controller')
    const deletedUser = await deleteUserById()
    res.status(200).json(deletedUser)
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
}
