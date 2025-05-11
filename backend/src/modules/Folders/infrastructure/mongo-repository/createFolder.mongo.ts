import { Folder } from '../../domain/folders.entity';
import { FolderDB } from '../schemas/folders.schema.mongoose';

export async function createFolder(folder: Partial<Folder>): Promise<Folder | null> {
    try {
        // TODO: Add Validations if needed.

        // 1 Creates a new instance of the FolderDB model with the provided folder data.
        const newFolder = new FolderDB(folder);
        
        // 2 Saves the new folder to the database.
        const savedFolder = await newFolder.save(); // OPTIONAL: Parse the answer, or make a mapper.

        // 3 Returns the saved folder // TODO: excluding the __v field.
        return savedFolder.toObject({ versionKey: false});
    } catch (error) {
        // 4 Handle any errors that occur during the creation process.
        console.error('Error creating folder:', error);
        return null;
    }
}
