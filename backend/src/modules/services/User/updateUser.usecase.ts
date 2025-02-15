import { UserRepository } from '../../domain/repositories/User/user.repository';
import { UpdatedUserDto } from '../../domain/dtos/User/users.updateDto';

export class UpdateUserByIdUseCase {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string, updatedData: UpdatedUserDto): Promise<UpdatedUserDto | undefined> {
    try {

      // 1 
      const updatedUser = await this.repository.updateUserById(id, updatedData);

      if (!updatedUser) {
        throw new Error("User not found.");
      }
      
      // 2 
      const userEntity = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        refreshTokens: updatedUser.refreshTokens
      }
      
      // 3 
      return userEntity;


    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }
}

