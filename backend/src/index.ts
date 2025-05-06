import dotenv from 'dotenv';
dotenv.config(); // Injects the enviroment variables

import express from 'express';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from './configs/cors.config';
import { getMorganMiddleware } from './configs/morgan.config';


import api from './api';
import connectMongoDB from './connections/mongodb.connection';

const app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use(cors(corsOptions));
app.use(helmet());
app.use(getMorganMiddleware())
app.use(express.json());
app.use(cookieParser())

// Routes

app.use('/v1', api);
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use((err, res, next) => {
  console.error('🌍 Global error handler:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Testing 
export const testApp = app;

// Start

if (process.env.NODE_ENV !== 'test') {
  connectMongoDB()
  
  app.listen(port, () => {
    console.log('---------------------------')
    console.log('Platform: ', process.platform)
    console.log('Node Version: ', process.version)
    console.log('Process ID: ', process.pid)
    console.log('---------------------------')
    console.log(`🌎 Servidor corriendo en http://localhost:${port}`);
    console.log('---------------------------')
  });
}