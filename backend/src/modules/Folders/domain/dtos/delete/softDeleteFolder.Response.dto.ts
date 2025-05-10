import { z } from "zod"
import { FolderSchema } from "../../folders.entity"

export const SoftDeleteFolderResponseSchema = FolderSchema.pick({
    _id: true,
    firstName: true,
    lastName: true,
    deletedAt: true,
    deletedBy: true
})
.partial().strict()

export type SoftDeleteFolderResponseSchemaDTO = z.infer<typeof SoftDeleteFolderResponseSchema>;
