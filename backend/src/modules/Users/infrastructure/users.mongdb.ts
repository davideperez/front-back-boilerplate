import { z } from "zod";

import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";
import { UserDB } from './users.schema.mongoose'

import { UserCreateDto } from '../domain/dtos/create/users.createDto';
import { UserCreateResponseDto } from '../domain/dtos/create/users.createResponseDto';
import { GetUserDTO } from "../domain/dtos/read/users.getByIdDto";
import { FindUserByEmailDto } from "../domain/dtos/read/users.findByEmailDto";
import { GetAllUsersDTO } from "../domain/dtos/read/users.getAllDto";
import { UpdatedUserDto } from "../domain/dtos/update/users.updateDto";


export class UserMongoRepository implements UserRepository {

  async createUser(user: UserCreateDto): Promise<UserCreateResponseDto | null> { // TODO: revisar este tipo.
    try {
      // 1 Instanciar un nuevo usuario usando el schema de mongo y el user recibido.
      const newUser = new UserDB(user)
      
     // 2 Validar que el usuario no exista.
      const userExists = await this.userExists(newUser.email)
      
      if (userExists) {
        throw new Error('El usuario ya existe')
      }

      // 3 Guardar el usuario en mongodb.
      await newUser.save()
      
      // 4.1 Retornar el usuario.
      return newUser
      
    } catch (error) {
      console.error('No se pudo crear el usuario.', error)
      // 4.2 Retornar null si no se pudo crear el usuario.
      return null
    } 
  }
  async getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | null> {
    try {
      const query: {[key: string]: any} = {};
      
      if (search) query.title = { $regex: `${search}`, $options: 'i' };
        
      const users = await UserDB.find(query, {'__v': 0})
      .skip((page - 1) * items)
      .limit(items)

      const totalCount = await UserDB.countDocuments(query);

      const result: GetAllUsersDTO = {
        users, 
        totalCount,
        page,
        itemsPerPage: items
      }

      return result
    } catch (error) {
      throw new Error("Error fetching the users."); // TODO: mejorar estos errores.
    }
  }
  
  async getUserById(id: string): Promise<GetUserDTO | null> {
    try {
      if (!id) {
        throw new Error("Invalid ID.");
      }
      // 1 Se hace fetch del usaurio, a la db de mongo.
      const user = await UserDB.findById(id)

      // 2 Se valida que exista usuario.
      if (!user) {
        throw new Error()
      }

      // 3 se construye el usuario 
      // TODO: Esto no deberia usarse la interfaz del dto?
      // TODO: Este armado de la entidad no deberia ir en el useCase?
      const userEntity: GetUserDTO = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      
      // 4 Se retorna el usuario.
      return userEntity
    } catch (error) {
      console.error("Error: ", error) // TODO: a mejorar.
      return null
    }
    
  }

  async userExists(email: string): Promise<boolean> {
    try {
      // 1 Validate that the email is not null or empty // TODO: Does this validation belong here?
      
      const emailValidation = z.string().email().safeParse(email)
      
      if (!emailValidation.success) {
        throw new Error("Invalid email.");
      }

      // 2 Fetches the user from the database.
      const user = await UserDB.findOne({ email })
      
      // 3 Validates that the user exists.
      if (!user) {
        return false
      }

      return true
    } catch (error) {
      console.error("Error verifying user: ", error) // TODO: a mejorar.
      return false
    }
  }

  async findUserByEmail(email: string): Promise<FindUserByEmailDto | null> {
    if (!email) {
      throw new Error("Invalid email.");
    }
    
    try {
      // 1 Fetch the user from the database.
      const user = await UserDB.findOne({email})
      
      // 2 Validate that the user exists.
      if (!user) {
        throw new Error("")
      }
      
      // 3 Build the user
      // TODO: Esto no deberia usarse la interfaz del dto?
      // TODO: Este armado de la entidad no deberia ir en el useCase? Y en todo caso 
      const userEntity: FindUserByEmailDto = {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        refreshTokens: user.refreshTokens
      }
      
      // 4 Return the user.
      return userEntity
    } catch (error) {
      console.error("Error: ", error) // TODO: a mejorar.
      return null
    }
  }

  async updateUserById(id: string, user: UpdatedUserDto): Promise<User | null> {
    try {
      // 1 Validar que el ID no sea nulo o vacío
      if (!id) {
        throw new Error("Invalid ID.");
      }

      // 2 Create an object representing the data to update.

      const updatedData: any = {} // TODO: Is this type ok?

      // 3 Attach the refreshTokens's update.
      if (user.refreshTokens) {
        updatedData.$push = { refreshTokens: { $each: user.refreshTokens }}
      }

      // 
      
      // 4 Realizar la actualización de los campos proporcionados
      const updatedUser = await UserDB.findByIdAndUpdate(
        id,
        { $set: user }, // Solo actualiza los campos que estén en el objeto `user`
        { new: true }   // Retorna el documento actualizado
      ).select('-__v');  // Excluir el campo `__v` de la respuesta
      
      // 5 Verificar que el usuario exista después de la actualización
      if (!updatedUser) {
        throw new Error("User not found.");
      }
      
      // 6 Devuelve el usuario actualizado
      return updatedUser;

    } catch (error: any) {
      console.error("Error updating user: ", error.message);
      throw new Error("Error updating the user.");
    }
    
  }
  async deleteUserById(id: string): Promise<User> {
    try {
      // 1. Validate that the ID is not null or empty
      if (!id) {
        throw new Error("Invalid ID.");
      }
  
      // 2. Attempt to delete the user by ID
      const deletedUser = await UserDB.findByIdAndDelete(id);
  
      // 3. Verify that the user was deleted
      if (!deletedUser) {
        throw new Error("User not found.");
      }
      return deletedUser
    } catch (error: any) {
      console.error("Error deleting user: ", error.message);
      throw new Error("Error deleting the user.");
    }
  }
}
