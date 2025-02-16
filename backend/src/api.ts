import express from 'express';

import usersRouter from './modules/infrastructure/User/users.router';
import authRouter from './modules/infrastructure/Auth/auth.router';

const api = express.Router();

// Routes
api.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!!!');
});

api.use('/users', usersRouter);
api.use('/auth', authRouter);

export default api;