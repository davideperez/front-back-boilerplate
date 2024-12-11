import { UserRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';

export class UpdateUserByIdUseCase {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string, updatedData: Partial<User>): Promise<User | undefined> {
    try {
      const updatedUser = await this.repository.updateUserById(id, updatedData);

      if (!updatedUser) {
        throw new Error("User not found.");
      }
      
      const userEntity: User = {
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
