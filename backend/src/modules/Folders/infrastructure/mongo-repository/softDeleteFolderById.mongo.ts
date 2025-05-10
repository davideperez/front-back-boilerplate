import { Folder } from "../../domain/folders.entity";
import { FolderDB } from "./folders.schema.mongoose";

export async function softDeleteFolderById(
    folderId: string, userId: string
): Promise<Folder | null> {
    console.log("softDeleteFolderById > folderId:" , folderId)
    console.log("softDeleteFolderById > userId:" , userId)

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

    console.log("softDeleteFolderById > deletedFolder:" , deletedFolder)

    return deletedFolder;
}