import { UserMongoRepository } from "./modules/infrastructure/User/users.mongdb";

import { ExpressUsersController } from "./modules/infrastructure/User/users.controller.express";
import { GetAllUsersUseCase } from "./modules/services/User/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./modules/services/User/getUserById.usecase";
import { FindUserByEmailUseCase } from "./modules/services/User/findUserByEmail.usecase";
import { UpdateUserByIdUseCase } from "./modules/services/User/updateUser.usecase";
import { DeleteUserByIdUseCase } from "./modules/services/User/deleteUserById.usecase";

import { ExpressAuthController } from "./modules/infrastructure/Auth/auth.controller.express";
import { SignUpUseCase } from "./modules/services/Auth/singUpUser.usecase";
import { LoginUseCase } from "./modules/services/Auth/loginUser.usecase";
import { GetMeUseCase } from "./modules/services/Auth/getMe.usecase";
import { LogoutUseCase } from "./modules/services/Auth/logoutUser.usecase";

// ---------------- Users ----------------  //


// Repositorio (Domain)
const userRepository = new UserMongoRepository()

// Servicios (Aplication)
export const getUserByIdService = new GetUserByIdUseCase(userRepository)
export const findUserByEmailService = new FindUserByEmailUseCase(userRepository)
export const getAllUsersService = new GetAllUsersUseCase(userRepository)
export const updateUserByIdService = new UpdateUserByIdUseCase(userRepository)
export const deleteUserByIdService = new DeleteUserByIdUseCase(userRepository)

// Controlador (Infrastructure)
export const usersController = new ExpressUsersController({
  getUserByIdService,
  findUserByEmailService,
  getAllUsersService, 
  updateUserByIdService,
  deleteUserByIdService,
})

// ---------------- Auth ----------------  //

// Servicios (Aplication)

export const loginService = new LoginUseCase(updateUserByIdService, findUserByEmailService)
export const signUpService = new SignUpUseCase(userRepository)
export const getMeService = new GetMeUseCase(getUserByIdService) // TODO: Is this interdependence between the Auth and User Model ok?
export const logoutService = new LogoutUseCase(/* getUserByIdService */)


// Controlador (Infrastructure)


export const authController = new ExpressAuthController({
  signUpService,
  loginService,
  getMeService,
  logoutService, 
  getUserByIdService
})
