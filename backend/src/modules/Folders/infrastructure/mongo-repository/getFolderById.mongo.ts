import { Folder } from '../../domain/folders.entity';
import { FolderDB } from './folders.schema.mongoose';

export async function getFolderById(id: string): Promise<Folder | null> {
    try {
        // Find the folder in the DB.
        console.log("FoldersMongoRepository > getFolderById > HI!!")
        const folder = await FolderDB.findById({
            _id: id,
            deletedAt: null,
            deletedBy: null
        }).exec();
        console.log("FoldersMongoRepository > getFolderById > folder", folder)
        
        // Return the Folder
        return folder;
    } catch (error) {
        console.error('Error getting folder by ID:', error);
        return null;
    }
}