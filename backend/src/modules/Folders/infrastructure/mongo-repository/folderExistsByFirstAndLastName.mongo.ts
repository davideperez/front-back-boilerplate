import { FolderDB } from "./folders.schema.mongoose";

export async function folderExistsByFirstAndLastName(firstName: string, lastName: string): Promise<boolean | null> {
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
            lastName: folderToLookFor.lastName,
            deletedAt: null,
            deletedBy: null
        })
        .exec();
        
        // 3. If exists, return true, else return false
        return exists ? true : false;
    } catch (error) {
        console.error('Error checking if folder exists:', error);
        return null;
    }
}