import { User } from "../../domain/entities/users.entity"; 
import { UsersCreate } from "../../domain/dtos/users/users.createDto";
import { UserRepository } from "../../domain/repositories/users.repository";
import { UserDB } from './schemas/users.mongoose'
import { GetAllUsersDTO } from "../../domain/dtos/users/users.getAllDto";
import { UpdatedUser } from "../../domain/dtos/users/users.updateDto";
import { LoginUserDto } from "../../domain/dtos/users/users.loginDto";
import { GetUser } from "../../domain/dtos/users/users.getByIdDto";

export class UserMongoRepository implements UserRepository {
  async createUser(user: UsersCreate): Promise<void> { // TODO: revisar este tipo.
    try { 
      // 1 Se instancia un nuevo usuario usando el schema de mongo.
      const newUser = new UserDB(user)
      
      // 2 Se guarda el usuario en mongodb.
      await newUser.save()
    } catch (error) {
      console.error('No se pudo crear el usuario.', error)
    } 
  }
  async getAllUsers(page: number, items: number, search: string): Promise<GetAllUsersDTO | undefined> {
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
  async getUserById(id: string): Promise<GetUser | undefined> {
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
      const userEntity: GetUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      // 4 Se retorna el usuario. 
      return userEntity
    } catch (error) {
      console.error("Error: ", error) // TODO: a mejorar.
    }
    
  }
  async findUserByEmail(email: string): Promise<LoginUserDto | undefined> {
    try {
      if (!email) {
        throw new Error("Invalid email.");
      }
      // 1 Se hace fetch del usaurio, a la db de mongo.
      const user = await UserDB.findById(email)
      // 2 Se valida que exista usuario.
      if (!user) {
        throw new Error()
      }
      // 3 se construye el usuario 
      // TODO: Esto no deberia usarse la interfaz del dto?
      // TODO: Este armado de la entidad no deberia ir en el useCase?
      const userEntity: LoginDto = {
        password: user.password,
        email: user.email
      }
      // 4 Se retorna el usuario. 
      return userEntity
    } catch (error) {
      console.error("Error: ", error) // TODO: a mejorar.
    }
  }
  async updateUserById(id: string, user: UpdatedUser): Promise<User | undefined> {
    try {
      // 1. Validar que el ID no sea nulo o vacío
      if (!id) {
        throw new Error("Invalid ID.");
      }
  
      // 2. Realizar la actualización de los campos proporcionados
      const updatedUser = await UserDB.findByIdAndUpdate(
        id,
        { $set: user }, // Solo actualiza los campos que estén en el objeto `user`
        { new: true }   // Retorna el documento actualizado
      ).select('-__v');  // Excluir el campo `__v` de la respuesta
  
      // 3. Verificar que el usuario exista después de la actualización
      if (!updatedUser) {
        throw new Error("User not found.");
      }
      // 4 Devuelve el usuario actualizado
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