import { Folder } from "../domain/folders.entity";
import { FoldersRepository } from "../domain/folders.repository";

export class GetFolderByIdUseCase {
  private repository: FoldersRepository
    
  constructor (repository: FoldersRepository) {
    this.repository = repository
  }

  async execute(id: string): Promise<Partial<Folder> | null> {
      console.log('GetFolderByIdUseCase executed');
      // Implement the logic to delete a folder by its ID here
      return null; // Placeholder return value, replace with actual implementation
  }    
}