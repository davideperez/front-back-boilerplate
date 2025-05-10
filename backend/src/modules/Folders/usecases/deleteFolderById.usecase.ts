import { MongoIdSchema } from "../../../shared/dtos/mongoId.Schema";
import { Folder } from "../domain/folders.entity";
import { FoldersRepository } from "../domain/folders.repository";

export class DeleteFolderByIdUseCase {
    private repository: FoldersRepository
    
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }

    async execute(folderId: string, userId: string): Promise<Folder | undefined> {
        console.log("DeleteFolderByIdUseCase > folderId:" , folderId)
        console.log("DeleteFolderByIdUseCase > userId:" , userId)
        // 1 Validate Folder Exists.
        const folderExists = await this.repository.getFolderById(folderId)
        
        if (folderExists) {
            throw new Error('Folder not found.')
        }
        console.log("DeleteFolderByIdUseCase > folderExists:" , folderExists)

        // 2 Soft delete the folder.
        const wasDeleted = await this.repository.softDeleteFolderById(folderId, userId)
        console.log("DeleteFolderByIdUseCase > wasDeleted:" , wasDeleted)

        // 2.1 Handle deletion error with the deletecount. 
        if(!wasDeleted) throw new Error("Folder not found or already deleted")

        // 3 Return the deleted Folder
        return wasDeleted;
    }    
}
