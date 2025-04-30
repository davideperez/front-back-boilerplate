// Not in use, just a Gepetto sugstion for reference.

export enum ErrorTypes {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const errorMap: Record<ErrorTypes, { message: string; statusCode: number }> = {
  [ErrorTypes.USER_NOT_FOUND]: { message: "User not found", statusCode: 404 },
  [ErrorTypes.EMAIL_ALREADY_IN_USE]: { message: "Email is already in use", statusCode: 400 },
  [ErrorTypes.INVALID_CREDENTIALS]: { message: "Invalid email or password", statusCode: 401 },
  [ErrorTypes.UNAUTHORIZED_ACCESS]: { message: "Unauthorized access", statusCode: 403 },
  [ErrorTypes.INTERNAL_SERVER_ERROR]: { message: "Something went wrong", statusCode: 500 },
};
