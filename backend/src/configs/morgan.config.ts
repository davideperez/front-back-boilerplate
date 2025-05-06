// src/config/morgan.config.ts
import morgan from 'morgan';
import { RequestHandler } from 'express';

export const getMorganMiddleware = (): RequestHandler => {
  if (process.env.NODE_ENV === 'production') {
    return morgan('combined'); // más detallado para producción
  } else {
    return morgan('dev'); // más legible y colorido para desarrollo
  }
};

