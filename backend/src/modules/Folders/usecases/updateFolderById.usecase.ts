import { FoldersRepository } from "../domain/folders.repository";


export class UpdateFolderByIdUseCase {
    private repository: FoldersRepository
        
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }
    async execute(id: string, updatedData: any): Promise<any | undefined> {
        console.log('UpdateFolderByIdUseCase executed');
        // Implement the logic to delete a folder by its ID here
    }    
}