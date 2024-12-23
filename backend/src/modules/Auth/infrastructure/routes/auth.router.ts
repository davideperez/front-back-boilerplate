import { Router } from 'express';
import passport from 'passport';
// import { authController } from '../../setup';

const authRouter = Router();

// authRouter.post('/register', authController.register);
// authRouter.post('/refresh', authController.refresh);
// authRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);
// authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// authRouter.get('/google/callback', passport.authenticate('google', { session: false }), login);

export default authRouter;