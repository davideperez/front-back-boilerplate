import { ExpressUsersController } from "./Users/infrastructure/users.controller.express";
import { UserMongoRepository } from "./Users/infrastructure/repositories/mongodb/users.mongdb";

import { CreateUserUseCase } from "./Users/services/createUser.usecase";
import { GetAllUsersUseCase } from "./Users/services/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./Users/services/getUserById.usecase";
import { FindUserByEmailUseCase } from "./Users/services/findUserByEmail.usecase";
import { UpdateUserByIdUseCase } from "./Users/services/updateUser.usecase";
import { DeleteUserByIdUseCase } from "./Users/services/deleteUserById.usecase";

// ---------------- Users ----------------  //

// Repositorio (Domain)
const userRepository = new UserMongoRepository()

// Servicios (Aplication)
export const createUserService = new CreateUserUseCase(userRepository)
export const getUserByIdService = new GetUserByIdUseCase(userRepository)
export const getAllUsersService = new GetAllUsersUseCase(userRepository)
export const findUserByEmailService = new FindUserByEmailUseCase(userRepository)
export const updateUserByIdService = new UpdateUserByIdUseCase(userRepository)
export const deleteUserByIdService = new DeleteUserByIdUseCase(userRepository)

// Controlador (Infrastructure)
export const usersController = new ExpressUsersController({
  createUserService,
  getUserByIdService,
  getAllUsersService, 
  findUserByEmailService,
  updateUserByIdService,
  deleteUserByIdService,
})



// TODO: User, Auth.. deberian estar en setups separados?
//       O hay alguna manera mejor de disponer el codigo en este archivo?
// ----------------- Auth -----------------  //

// PROBLEMA: Cual es el equivalente a UserMongoRepository 
//           que vive en /src/infrastructure/repositories/users.mongodb.ts
//           pero de la Autenticacion?
// RESPUESTA: Es auth.middleware.ts???
/* 
const authMiddleware = new 

export const loginService = new LoginServiceUseCase()
export const refreshService = new RefreshServiceUseCase()

// Controlador
export const authController = new AuthController(
  loginService,
  refreshService
)
 */