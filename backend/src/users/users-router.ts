import express from 'express';
import { 
    httpAddNewUser,
    httpGetAllUsers,
    httpGetUser,
    httpDeleteUser,
    httpUpdateUser,
} from './users-controller'

const usersRouter = express.Router()

usersRouter.post('/', httpAddNewUser);
usersRouter.get('/:id', httpGetUser);
usersRouter.get('/', httpGetAllUsers);
usersRouter.put('/:id', httpUpdateUser);
usersRouter.delete('/:id', httpDeleteUser);

export default usersRouter;