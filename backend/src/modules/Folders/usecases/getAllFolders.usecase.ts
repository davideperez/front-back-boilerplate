import { FoldersRepository } from "../domain/folders.repository";
import { GetFoldersFromDBRequestDTO, GetFoldersFromDBResponseDTO  } from "../domain/dtos/read/getAllFoldersResponse.dto";

export class GetAllFoldersUseCase {
    private repository: FoldersRepository

    constructor (repository: FoldersRepository) {
        this.repository = repository
    }

    async execute(input: GetFoldersFromDBRequestDTO): Promise<GetFoldersFromDBResponseDTO> {
        // 1. Validate the input data
        const { search, sortBy, sortOrder, skip, limit } = input;
        
        // 2. Call the repository to get the folders from the database
        const foldersFromDBResponse = await this.repository.getFoldersFromDB({ search, sortBy, sortOrder, skip, limit });
        // TODO: should here be an error throwing or exception handling?
        
        // 3. Return the result
        return foldersFromDBResponse;
    }
}