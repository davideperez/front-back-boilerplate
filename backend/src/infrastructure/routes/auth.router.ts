import { Router } from 'express';
import passport from 'passport';
import { authController } from '../../setup';

const authRouter = Router();

authRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);
authRouter.post('/refresh', authController.refresh);
// authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// authRouter.get('/google/callback', passport.authenticate('google', { session: false }), login);

export default authRouter;