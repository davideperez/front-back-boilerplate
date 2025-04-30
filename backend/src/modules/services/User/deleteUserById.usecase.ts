import { User } from '../../domain/User/entities/user.entity';
import { UserRepository } from '../../domain/User/repositories/user.repository'

export class DeleteUserByIdUseCase {
  private repository: UserRepository;
  
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<User> {
    // 1. Validar el ID
    if (!id || typeof id !== 'string') {
      throw new Error("Invalid ID provided.");
    }
    try {
      // 2. Delegar la eliminación al repositorio
      const deletedUser = await this.repository.deleteUserById(id);

      // 3. Verify that the user was deleted
      if (!deletedUser) {
        throw new Error("User not found.");
      }
      return deletedUser
    } catch (error: any) {
      // 3. Manejar posibles errores del repositorio
      console.error("Error in DeleteUserByIdUseCase: ", error.message);
      throw new Error("Error executing delete user operation.");
    }
  }
}
