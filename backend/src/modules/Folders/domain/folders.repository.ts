import { GetFoldersFromDBRequestDTO, GetFoldersFromDBResponseDTO } from "./dtos/read/getAllFoldersResponse.dto";
import { Folder } from "./folders.entity";


export interface FoldersRepository {
    folderExistsByFirstAndLastName(firstName: string, lastName: string): Promise<boolean | null>;
    createFolder(folder: Partial<Folder>): Promise<Folder | null>;
    getFolderById(id: string): Promise<Folder | null>;
    getFolders({}: GetFoldersFromDBRequestDTO): Promise<GetFoldersFromDBResponseDTO>;
    updateFolderById(id: string, folder: Partial<Folder>): Promise<Folder | null>;
    softDeleteFolderById(id: string, userId: string): Promise<Folder | null>;
}
