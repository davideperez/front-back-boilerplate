import { Folder } from "../../domain/folders.entity";
import { FolderDB } from "../schemas/folders.schema.mongoose";

export async function updateFolderById(id: string, folder: Partial<Folder>): Promise<Folder | null> {
    const updatedFolder = await FolderDB.findByIdAndUpdate(
        {
            _id: id,
            deletedAt: null,
            deletedBy: null
        },
        folder,
        { new: true }
    )
    return updatedFolder;
}