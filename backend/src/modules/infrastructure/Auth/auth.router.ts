import express from 'express';
import { authenticateToken } from './utils/authenticateToken';
import { authController } from '../../../setup';

const authRouter = express.Router()

// Access
authRouter.post('/', authController.httpSignUpUser);
authRouter.post('/login', authController.httpLoginUser);
authRouter.get('/me', authenticateToken, authController.httpGetMe);
authRouter.post('/logout', authController.httpLogoutUser)

export default authRouter;
