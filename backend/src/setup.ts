import { ExpressUsersController } from "./modules/Users/infrastructure/users.controller.express";
import { UserMongoRepository } from "./modules/Users/infrastructure/repositories/mongodb/users.mongdb";

import { SignUpUseCase } from "./modules/Users/services/singUpUser.usecase";
import { LoginUseCase } from "./modules/Users/services/loginUser.usecase";
import { GetAllUsersUseCase } from "./modules/Users/services/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./modules/Users/services/getUserById.usecase";
import { UpdateUserByIdUseCase } from "./modules/Users/services/updateUser.usecase";
import { DeleteUserByIdUseCase } from "./modules/Users/services/deleteUserById.usecase";

// ---------------- Users ----------------  //

// Repositorio (Domain)
const userRepository = new UserMongoRepository()

// Servicios (Aplication)
export const signUpService = new SignUpUseCase(userRepository)
export const loginService = new LoginUseCase(userRepository)
export const getUserByIdService = new GetUserByIdUseCase(userRepository)
export const getAllUsersService = new GetAllUsersUseCase(userRepository)
export const updateUserByIdService = new UpdateUserByIdUseCase(userRepository)
export const deleteUserByIdService = new DeleteUserByIdUseCase(userRepository)

// Controlador (Infrastructure)
export const usersController = new ExpressUsersController({
  signUpService,
  loginService,
  getUserByIdService,
  getAllUsersService, 
  updateUserByIdService,
  deleteUserByIdService,
})
