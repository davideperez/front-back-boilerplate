import { FolderSchema } from "../../folders.entity"

export const UpdateFolderSchema = FolderSchema.pick({
    _id: true,
    firstName: true,
    lastName: true,
    birthDate: true,
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
.partial().strict() // TODO: Isnt this a contradiction?