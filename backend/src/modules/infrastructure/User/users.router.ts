import express from 'express';
import { usersController } from '../../../setup';
import { authenticateToken } from '../Auth/authenticateToken';

const usersRouter = express.Router()

// Access
usersRouter.post('/', usersController.httpSignUpUser);
usersRouter.post('/login', usersController.httpLoginUser);
usersRouter.get('/me', authenticateToken, usersController.httpGetMe);
usersRouter.post('/logout', usersController.httpLogoutUser)

// Read
usersRouter.get('/:id', usersController.httpGetUser);
usersRouter.get('/', usersController.httpGetAllUsers);

// Update
usersRouter.put('/:id', usersController.httpUpdateUser);

// Delete
usersRouter.delete('/:id', usersController.httpDeleteUser);

export default usersRouter;
