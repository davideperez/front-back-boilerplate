
// Folders Imports

import { FoldersMongoRepository } from "./modules/Folders/infrastructure/folders.mongodb";


import { ExpressFoldersController } from "./modules/Folders/infrastructure/folders.controller.express";
import { GetAllFoldersUseCase } from "./modules/Folders/usecases/getAllFolders.usecase";
import { GetFolderByIdUseCase } from "./modules/Folders/usecases/getFolderById.usecase";
import { CreateFolderUseCase } from "./modules/Folders/usecases/createFolder.usecase";
import { UpdateFolderByIdUseCase } from "./modules/Folders/usecases/updateFolderById.usecase";
import { DeleteFolderByIdUseCase } from "./modules/Folders/usecases/deleteFolderById.usecase";

// Users Imports

import { UserMongoRepository } from "./modules/Users/infrastructure/users.mongdb";
import { ExpressUsersController } from "./modules/Users/infrastructure/users.controller.express";

import { GetAllUsersUseCase } from "./modules/Users/usecases/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./modules/Users/usecases/getUserById.usecase";
import { FindUserByEmailUseCase } from "./modules/Users/usecases/findUserByEmail.usecase";
import { UpdateUserByIdUseCase } from "./modules/Users/usecases/updateUser.usecase";
import { DeleteUserByIdUseCase } from "./modules/Users/usecases/deleteUserById.usecase";

// Auth Imports

import { ExpressAuthController } from "./modules/Auth/infrastructure/auth.controller.express";
import { SignUpUseCase } from "./modules/Auth/usecases/singUpUser.usecase";
import { LoginUseCase } from "./modules/Auth/usecases/loginUser.usecase";
import { GetMeUseCase } from "./modules/Auth/usecases/getMe.usecase";
import { LogoutUseCase } from "./modules/Auth/usecases/logoutUser.usecase";

// --------------------------------- Folders ---------------------------------  //

// Repositorio (Domain)
const folderRepository = new FoldersMongoRepository()

// Servicios (Aplication)
export const getFolderByIdUseCase = new GetFolderByIdUseCase(folderRepository)
export const getAllFoldersUseCase = new GetAllFoldersUseCase(folderRepository)
export const createFolderUseCase = new CreateFolderUseCase(folderRepository)
export const updateFolderByIdUseCase = new UpdateFolderByIdUseCase(folderRepository)
export const deleteFolderByIdUseCase = new DeleteFolderByIdUseCase(folderRepository)

// Controlador (Infrastructure)
export const foldersController = new ExpressFoldersController({
  getFolderByIdUseCase: getFolderByIdUseCase,
  getAllFoldersUseCase: getAllFoldersUseCase,
  createFolderUseCase: createFolderUseCase,
  updateFolderByIdUseCase: updateFolderByIdUseCase,
  deleteFolderByIdUseCase: deleteFolderByIdUseCase,
})

// --------------------------------- Users ---------------------------------  //

// Repositorio (Domain)
const userRepository = new UserMongoRepository()

// Servicios (Aplication)
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
export const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository)
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
export const updateUserByIdUseCase = new UpdateUserByIdUseCase(userRepository)
export const deleteUserByIdUseCase = new DeleteUserByIdUseCase(userRepository)

// Controlador (Infrastructure)
export const usersController = new ExpressUsersController({
  getUserByIdUseCase: getUserByIdUseCase,
  findUserByEmailUseCase: findUserByEmailUseCase,
  getAllUsersUseCase: getAllUsersUseCase, 
  updateUserByIdUseCase: updateUserByIdUseCase,
  deleteUserByIdUseCase: deleteUserByIdUseCase,
})

// ---------------- Auth ----------------  //

// Servicios (Aplication)

export const loginUseCase = new LoginUseCase(updateUserByIdUseCase, findUserByEmailUseCase)
export const signUpUseCase = new SignUpUseCase(userRepository)
export const getMeUseCase = new GetMeUseCase(getUserByIdUseCase) // TODO: Is this interdependence between the Auth and User Model ok?
export const logoutUseCase = new LogoutUseCase(/* getUserByIdUseCase */)

// Controlador (Infrastructure)

export const authController = new ExpressAuthController({
  signUpUseCase: signUpUseCase,
  loginUseCase: loginUseCase,
  getMeUseCase: getMeUseCase,
  logoutUseCase: logoutUseCase, 
  getUserByIdUseCase: getUserByIdUseCase
})
