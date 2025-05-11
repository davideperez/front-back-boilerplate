import { Folder } from "../../domain/folders.entity";
import { FolderDB } from "../schemas/folders.schema.mongoose";

export async function softDeleteFolderById(folderId: string, userId: string): Promise<Folder | null> {
    const deletedFolder = await FolderDB.findOneAndUpdate(
        { _id: folderId },
        { 
            $set: { 
                deletedAt: new Date(),
                deletedBy: userId
            }
        },
        { new: true }
    )

    return deletedFolder;
}