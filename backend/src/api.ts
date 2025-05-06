import express from 'express';

import usersRouter from './modules/Users/infrastructure/users.router';
import authRouter from './modules/Auth/infrastructure/auth.router';
import foldersRouter from './modules/Folders/infrastructure/folders.router';

const api = express.Router();

// Routes
api.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!!!');
});

api.use('/users', usersRouter);
api.use('/auth', authRouter);
api.use('/folders', (req, res, next) => {
  next();
}, foldersRouter);

export default api;