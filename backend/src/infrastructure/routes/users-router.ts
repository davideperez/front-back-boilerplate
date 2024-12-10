import express from 'express';
import { userController } from '../../setup';

const usersRouter = express.Router()

usersRouter.post('/', userController.httpAddNewUser);
// usersRouter.get('/:id', userController.httpGetUser);
usersRouter.get('/', userController.httpGetAllUsers);
// usersRouter.put('/:id', httpUpdateUser);
// usersRouter.delete('/:id', httpDeleteUser);

export default usersRouter;
