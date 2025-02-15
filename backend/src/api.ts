import express from 'express';

import usersRouter from './modules/infrastructure/User/users.router';

const api = express.Router();

// Routes
api.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!!!');
});

api.use('/users', usersRouter);

export default api;