import { UserController } from "./infrastructure/controllers/users.controller";
import { UserMongoRepository } from "./infrastructure/repositories/users.mongdb";
import { CreateUserUseCase } from "./services/users/createUser.usecase";
import { DeleteUserByIdUseCase } from "./services/users/deleteUserById.usecase";
import { GetAllUsersUseCase } from "./services/users/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./services/users/getUserById.usecase";
import { UpdateUserByIdUseCase } from "./services/users/updateUser.usecase";

// 2. Instanciamos un MongoRepository que cumple con el contrato de user.repositories.ts
const userMongoRepository = new UserMongoRepository()

// 1. Instanciamos el servicio con MongoDB. 
export const getUserByIdService = new GetUserByIdUseCase(userMongoRepository)
export const createUserService = new CreateUserUseCase(userMongoRepository)
export const getAllUsersService = new GetAllUsersUseCase(userMongoRepository)
export const updateUserService = new UpdateUserByIdUseCase(userMongoRepository)
export const deleteUserByIdService = new DeleteUserByIdUseCase(userMongoRepository)

// 3. Instancio el controllador
export const userController = new UserController(
  getUserByIdService, 
  createUserService, 
  getAllUsersService, 
  updateUserService, 
  deleteUserByIdService
)

