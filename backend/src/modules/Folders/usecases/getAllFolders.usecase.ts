import { FoldersRepository } from "../domain/folders.repository";
import { GetFoldersFromDBRequestDTO, GetFoldersFromDBResponseDTO  } from "../domain/dtos/read/getAllFoldersResponse.dto";

export class GetAllFoldersUseCase {
    private repository: FoldersRepository

    constructor (repository: FoldersRepository) {
        this.repository = repository
    }

    async execute(input: GetFoldersFromDBRequestDTO): Promise<GetFoldersFromDBResponseDTO> {
        try {
            // 1. Validate the input data
            const { search, sortBy, sortOrder, skip, limit } = input;
            
            // 2. Call the repository to get the folders from the database
            const foldersFromDBResponse = await this.repository.getFolders({ search, sortBy, sortOrder, skip, limit });
            
            // 3. Return the result
            return foldersFromDBResponse;
        } catch (error) {
            console.error("Error at getting folders: ", error)
            throw error
        }
    }
}
