import { FoldersRepository } from "../domain/folders.repository";
import { Folder } from "../domain/folders.entity";

export class GetAllFoldersUseCase {
    private repository: FoldersRepository

    constructor (repository: FoldersRepository) {
        this.repository = repository
    }

    async execute(): Promise<Folder[] | null> {
        console.log('GetAllFoldersUseCase executed');
        // Implement the logic to delete a folder by its ID here
        return null // Placeholder return value, replace with actual implementation
    }    
}