import { z } from "zod"
import { FolderSchema } from "../../folders.entity"

export const UpdateFolderSchema = FolderSchema.pick({
    firstName: true,
    lastName: true,
    profilePicture: true,
    nationality: true,
    identityDocumentType: true,
    identityDocumentNumber: true,
    identityDocumentExpirationDate: true,
    school: true,
    schoolYear: true,
    sex: true
}).extend({
    placeOfBirth: FolderSchema.shape.placeOfBirth.partial().optional()
})
.partial().strict()