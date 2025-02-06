import express from 'express';
import { usersController } from '../../../setup';

const usersRouter = express.Router()

// SignUp
usersRouter.post('/', usersController.httpSignUpUser);

// Read
usersRouter.get('/:id', usersController.httpGetUser);
usersRouter.get('/', usersController.httpGetAllUsers);

// Update
usersRouter.put('/:id', usersController.httpUpdateUser);

// Delete
usersRouter.delete('/:id', usersController.httpDeleteUser);

usersRouter.post('/login', usersController.httpLoginUser);

export default usersRouter;
