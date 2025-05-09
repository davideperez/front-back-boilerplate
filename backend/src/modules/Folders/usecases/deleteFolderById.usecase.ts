import { FoldersRepository } from "../domain/folders.repository";

export class DeleteFolderByIdUseCase {
    private repository: FoldersRepository
    
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }
    async execute(id: string): Promise<void | undefined> {
        // 1. Validar el ID

        // 2. Validate the folder exists. 

        // 2.1 Validate the folder does not exisits exception. 

        // 3 Delete the folder. 

        // 3.1 Handle deletion error with the deletecount. 
        

    }    
}
