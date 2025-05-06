import { Folder } from "../domain/folders.entity";
import { FoldersRepository } from "../domain/folders.repository";

export class CreateFolderUseCase {
    private repository: FoldersRepository
        
    constructor (repository: FoldersRepository) {
        this.repository = repository
    }
    /**
     * Create a new folder in the database.
     * @param folderData - The data of the folder to be created.
     * @returns The created folder or null if the creation failed.
     */

    async execute(folderData: Partial<Folder>): Promise<Partial<Folder> | null> {
        // 1. Business logic: Validate no Folders with the same firsName AND lastName exists.

        const firstName = folderData.firstName
        const lastName = folderData.lastName

        if (!firstName || !lastName) {
            throw new Error('El nombre y el apellido son obligatorios.')
        } 

        const folderExists = await this.repository.folderExists(firstName, lastName)
        console.log('folderExists', folderExists)
        if (folderExists) {
            throw new Error('Ya existe una carpeta con el mismo nombre.')
        }

        // 2. Create the response of the folder created.
        const newFolder: Partial<Folder> = {
            _id: folderData._id,
            firstName: folderData.firstName,
            lastName: folderData.lastName,
            birthDate: folderData.birthDate,
            profilePicture: folderData.profilePicture,
            placeOfBirth: {
                city: folderData.placeOfBirth?.city,
                state: folderData.placeOfBirth?.state,
                country: folderData.placeOfBirth?.country,
            },
            sex: folderData.sex,
            nationality: folderData.nationality,
            identityDocumentType: folderData.identityDocumentType,
            identityDocumentNumber: folderData.identityDocumentNumber,
            identityDocumentExpirationDate: folderData.identityDocumentExpirationDate,
            school: folderData.school,
            schoolYear: folderData.schoolYear,
            createdBy: folderData.createdBy,
            updatedBy: folderData.updatedBy,
        }
        
        // 3. Create the folder in the database
        const newFolderResponse = await this.repository.createFolder(newFolder)

        if (!newFolderResponse) {
            throw new Error('Error inesperado: No se pudo crear la carpeta.')
        }
        // 4. Return the folder created
        return newFolderResponse
    }    
}
