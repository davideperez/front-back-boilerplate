import { FoldersRepository } from '../domain/folders.repository';
import { FolderDB } from './folders.schema.mongoose';
import { Folder } from '../domain/folders.entity'


export class FoldersMongoRepository implements FoldersRepository {
    // TODO: Revisar el tipo de folderDB y de client.
    // Dejarlo como para que se pueda usar cualquier cliente de mongoDB e incluso un mock

    // private folderDB: typeof FolderDB;

    // constructor(client: typeof FolderDB) {
    //     this.folderDB = client; 
    // }

    async createFolder(folder: Partial<Folder>): Promise<Folder | null> {
        try {
            // TODO: Add Validations if needed.

            // 1 Creates a new instance of the FolderDB model with the provided folder data.
            const newFolder = new FolderDB(folder);
            
            // 2 Saves the new folder to the database.
            const savedFolder = await newFolder.save();
            
             // OPTIONAL: Parse the answer, or make a mapper.
            // const savedFolderResponse = {
            //     id: savedFolder._id.toString(),
            //     firstName: savedFolder.firstName,
            //     lastName: savedFolder.lastName,
            //     birthDate: savedFolder.birthDate,
            //     profilePicture: savedFolder.profilePicture,
            //     placeOfBirth: savedFolder.placeOfBirth,
            //     sex: savedFolder.sex,
            //     nationality: savedFolder.nationality,
            //     identityDocumentType: savedFolder.identityDocumentType,
            //     identityDocumentNumber: savedFolder.identityDocumentNumber,
            //     identityDocumentExpirationDate: savedFolder.identityDocumentExpirationDate,
            //     school: savedFolder.school,
            //     schoolYear: savedFolder.schoolYear,
            //     createdAt: savedFolder.createdAt,
            //     updatedAt: savedFolder.updatedAt,
            //     createdBy: savedFolder.createdBy,
            //     updatedBy: savedFolder.updatedBy,
            // }

            // 3 Returns the saved folder // TODO: excluding the __v field.
            return savedFolder.toObject({ versionKey: false});
        } catch (error) {
            // 4 Handle any errors that occur during the creation process.
            console.error('Error creating folder:', error);
            return null;
        }
    }
    async getFolderById(id: string): Promise<Folder | null> {
        try {
            const folder = await FolderDB.findById(id).exec();
            return folder;
        } catch (error) {
            console.error('Error getting folder by ID:', error);
            return null;
        }
    }
    async getAllFolders(page: number, items: number, search: string): Promise<Folder[] | null> {
        try {
            const query: { [key: string]: any } = {};

            if (search) query.title = { $regex: `${search}`, $options: 'i' };

            const folders = await FolderDB.find(query, { '__v': 0 })
                .skip((page - 1) * items)
                .limit(items);

            return folders;
        } catch (error) {
            console.error('Error getting all folders:', error);
            return null;
        }
    }
    async updateFolderById(id: string, folder: Partial<Folder>): Promise<Folder | null> {
        try {
            const updatedFolder = await FolderDB.findByIdAndUpdate(id, folder, { new: true }).exec();
            return updatedFolder;
        } catch (error) {
            console.error('Error updating folder by ID:', error);
            return null;
        }
    }
    async deleteFolderById(id: string): Promise<Folder | null> {
        try {
            const deletedFolder = await FolderDB.findByIdAndDelete(id).exec();
            return deletedFolder;
        } catch (error) {
            console.error('Error deleting folder by ID:', error);
            return null;
        }
    }
    async folderExists(firstName: string, lastName: string): Promise<boolean> {
        try {
            // 1. Extracts and constructs the data
            const folderToLookFor = {
                firstName: firstName,
                lastName: lastName,
            };
            // 2. Checks if a folder with the same firstName and lastName exists
            const exists = await FolderDB
            .exists({
                firstName: folderToLookFor.firstName, 
                lastName: folderToLookFor.lastName
            })
            .exec();
            
            // 3. If exists, return true, else return false
            return exists ? true : false;
        } catch (error) {
            console.error('Error checking if folder exists:', error);
            throw new Error('Error checking if folder exists');
        }
    }
}    