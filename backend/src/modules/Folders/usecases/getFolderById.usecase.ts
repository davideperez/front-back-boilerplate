import { Folder } from "../domain/folders.entity";
import { FoldersRepository } from "../domain/folders.repository";

export class GetFolderByIdUseCase {
  private repository: FoldersRepository
    
  constructor (repository: FoldersRepository) {
    this.repository = repository
  }

  async execute(id: string): Promise<Partial<Folder> | null> {
    
    const folder = await this.repository.getFolderById(id)

      if(!folder) {
        return null
      }
      return folder; // Placeholder return value, replace with actual implementation
  }    
}
