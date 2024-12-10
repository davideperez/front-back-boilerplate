import { Query } from "mongoose";
import { User } from "../../domain/entities/users.entity"; 
import { UsersCreate } from "../../domain/models/users.createDto";
import { UserRepository } from "../../domain/repositories/users.repository";
import { UserDB } from './schemas/users.mongoose'
import { GetAllUsersDTO } from "../../domain/models/users.getAllDto";
import { stringify } from "node:querystring";

// 3. UserMongoRepository cumple el contrato de user.repository.ts
export class UserMongoRepository implements UserRepository {
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
      throw new Error("Error in getAllUsers - Method not implemented.");
    }
  }
  async createUser(user: UsersCreate): Promise<any> { //TBD revisar este tipo.
    try { 
      console.log('from users.mongodb.ts > createUser() > user', user)
      const newUser = new UserDB(user)
      await newUser.save()
    } catch (error) {
      throw error
    } 
  }
  
  async getUserById(id: number): Promise<User | undefined> {
    try {
      const user = await UserDB.findById(id)

      if (!user) {
        throw new Error()
      }
      
      const userEntity: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      return userEntity  
    } catch (error) {
      throw error
    }
    
  }
}