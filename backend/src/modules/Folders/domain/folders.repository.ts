import { Folder } from "./folders.entity";


export interface FoldersRepository {
    folderExists(firstName: string, lastName: string): Promise<boolean>;
    createFolder(folder: Partial<Folder>): Promise<Folder | null>;
    getFolderById(id: string): Promise<Folder | null>;
    getAllFolders(page: number, items: number, search: string): Promise<Folder[] | null>;
    updateFolderById(id: string, folder: Partial<Folder>): Promise<Folder | null>;
    deleteFolderById(id: string): Promise<Folder | null>;
}

/* 
// Version con DTOS: 

export interface FoldersRepository {
    createFolder(folder: CreateFolderInputDto): Promise<CreateFolderOutputDto | null>;
    getFolderById(id: string): Promise<GetFolderByIdOutputDto | null>;
    getAllFolders(page: number, items: number, search: string): Promise<GetAllFoldersOutputDto | null>;
    updateFolderById(id: string, folder: UpdateFolderInputDto): Promise<UpdateFolderOutputDto | null>;
    deleteFolderById(id: string): Promise<DeleteFolderOutputDto | null>;
}
 */
