import { FoldersRepository } from '../domain/folders.repository';
import { FolderDB } from './folders.schema.mongoose';
import { Folder } from '../domain/folders.entity'
import { GetFoldersFromDBRequestDTO, GetFoldersFromDBRequestSchema, GetFoldersFromDBResponseDTO } from '../domain/dtos/read/getAllFoldersResponse.dto';
// import { SortOrder } from 'mongoose';
import { SafeParseError } from 'zod';


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

    async getFoldersFromDB(input: GetFoldersFromDBRequestDTO): Promise<GetFoldersFromDBResponseDTO> {
        // 1. Extract the input
        const { search, sortBy, sortOrder, skip, limit } = input

        // 2. Construct a filter object based on the search term
        const filter = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
            ],
        };

        // 3. Construct a sort object based on the sortBy and sortOrder parameters
        type SortOrder = 1 | -1;

        const sort: { [key: string]: SortOrder }  = {};
        
        if (sortBy) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1
        }

        console.log('Folders Module > folders.mongodb.ts > getFoldersFromDB > This is "sortOrder":', sortOrder)
        console.log('Folders Module > folders.mongodb.ts > getFoldersFromDB > This is "sort":', sort)
        
        // 4 Construct the query to get the folders from the database
        const query = FolderDB.find(filter).sort(sort)
        
        if(typeof skip === 'number') query.skip(skip)
            if (typeof limit === 'number') query.limit(limit);
        
        // 5. Execute the query to get the folders from the database
        const folders = await query.exec();
        
        // 5.1 Handle the case when no folders are found
        if (!folders || folders.length === 0) {
            return {
                folders: [],
                totalItemsCount: 0,
            };
        }

        // 6. Get the total count of items in the collection
        const totalItemsCount = await FolderDB.countDocuments(filter).exec();
        
        // 7. Return the result as an object containing the folders and total items count
        return {
            folders,
            totalItemsCount,
        };
    }
    async updateFolderById(id: string, folder: Partial<Folder>): Promise<Folder | null> {
        console.log('This is folder: ', folder)
        console.log('This is id: ', id)
        const updatedFolder = await FolderDB.findByIdAndUpdate(id, folder, { new: true })/* .exec() */;
        console.log('This is updatedFolder: ', updatedFolder)
        return updatedFolder;
    }

    async deleteFolderById(id: string): Promise<Folder | null> {
        const deletedFolder = await FolderDB.findByIdAndDelete(id).exec();
        return deletedFolder;
    }
    async folderExists(firstName: string, lastName: string): Promise<boolean | null> {
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
            return null;
        }
    }
}    