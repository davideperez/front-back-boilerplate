import { FoldersRepository } from "../domain/folders.repository";

export class DeleteFolderByIdUseCase {
    private repository: FoldersRepository
    
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }
    async execute(id: string): Promise<void | undefined> {
        console.log('DeleteFolderByIdUseCase executed');
        // Implement the logic to delete a folder by its ID here
    }    
}
