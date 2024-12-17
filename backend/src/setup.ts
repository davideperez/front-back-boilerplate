import { UserController } from "./infrastructure/controllers/users.controller";
import { UserMongoRepository } from "./infrastructure/repositories/users.mongdb";

import { CreateUserUseCase } from "./services/users/createUser.usecase";
import { GetAllUsersUseCase } from "./services/users/getAllUsers.usecase";
import { GetUserByIdUseCase } from "./services/users/getUserById.usecase";
import { FindUserByEmailUseCase } from "./services/users/findUserByEmail.usecase";
import { UpdateUserByIdUseCase } from "./services/users/updateUser.usecase";
import { DeleteUserByIdUseCase } from "./services/users/deleteUserById.usecase";

// ---------------- Users ----------------  //

// 1 Instanciamos un MongoRepository que cumple con el contrato de user.repositories.ts
const userMongoRepository = new UserMongoRepository()

// 2 Instanciamos el servicio con MongoDB. 
export const createUserService = new CreateUserUseCase(userMongoRepository)
export const getUserByIdService = new GetUserByIdUseCase(userMongoRepository)
export const getAllUsersService = new GetAllUsersUseCase(userMongoRepository)
export const findUserByEmailService = new FindUserByEmailUseCase(userMongoRepository)
export const updateUserByIdService = new UpdateUserByIdUseCase(userMongoRepository)
export const deleteUserByIdService = new DeleteUserByIdUseCase(userMongoRepository)

// 3. Instancio el controllador
export const userController = new UserController({
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