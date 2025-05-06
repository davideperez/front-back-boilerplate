import express from 'express';
import { usersController } from '../../../setup';

const usersRouter = express.Router()

// Read
usersRouter.get('/:id', usersController.httpGetUser);
usersRouter.get('/', usersController.httpGetAllUsers);

// Update
usersRouter.put('/:id', usersController.httpUpdateUser, );

// Delete
usersRouter.delete('/:id', usersController.httpDeleteUser);

export default usersRouter;