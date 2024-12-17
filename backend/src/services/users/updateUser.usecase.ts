import { UserRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';
import { UpdatedUserDto } from '../../domain/dtos/users/users.updateDto';

export class UpdateUserByIdUseCase {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string, updatedData: UpdatedUserDto): Promise<UpdatedUserDto | undefined> {
    try {
      const updatedUser = await this.repository.updateUserById(id, updatedData);

      if (!updatedUser) {
        throw new Error("User not found.");
      }
      
      const userEntity = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      };
      
      return userEntity;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }
}
