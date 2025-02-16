// Not In Use.

import { errorMap, ErrorTypes } from "./errorTypes";

// TODO: This, along with the errorHandler.ts was a Gepetto Suggestion to implement an review.
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(errorType: ErrorTypes, isOperational = true) {
    super(errorMap[errorType].message);
    Object.setPrototypeOf(this, new.target.prototype);
    
    this.statusCode = errorMap[errorType].statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
