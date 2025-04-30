// Not in use. 

import { Request, Response, NextFunction } from 'express';
import { AppError } from './appErrors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
