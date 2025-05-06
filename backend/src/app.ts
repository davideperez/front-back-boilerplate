
import express from 'express';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from './configs/cors.config';
import { getMorganMiddleware } from './configs/morgan.config';

import api from './api';

const app = express();

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

export default app;
