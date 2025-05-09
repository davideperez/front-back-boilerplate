import { Folder } from "../domain/folders.entity";
import { FoldersRepository } from "../domain/folders.repository";


export class UpdateFolderByIdUseCase {
    private repository: FoldersRepository
        
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }
    async execute(id: string, updatedData: Partial<Folder>): Promise<Folder | undefined> {
        
        // 1 Checks if exists
        const folderToUpdate = await this.repository.getFolderById(id)
        
        // 1.1 Handles folder not found exception

        if(!folderToUpdate) {
            throw new Error('Folder not Found')
        }

        // 2 Calls the repository to update the folder
        const updatedFolder = await this.repository.updateFolderById(id, updatedData)

        // 2.1 Handles the error
        if (!updatedFolder) {
            throw new Error('Error inesperado: No se pudo actualizar el legajo.')
        }

        // 3 Returns the updated Folder
        return updatedFolder
    }    
}