import { z } from "zod";

export interface Folder {
    _id?: string;
    firstName: string,
    lastName: string,
    birthDate: Date,
    profilePicture?: string,
    placeOfBirth?: {
        city?: string;
        state?: string;
        country?: string;
    },
    sex: string,
    nationality?: string,
    identityDocumentType?: string,
    identityDocumentNumber?: string,
    identityDocumentExpirationDate?: Date,
    school?: string,
    schoolYear?: string,
    createdBy?: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const FolderSchema = z.object({
    _id: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.coerce.date(),
    profilePicture: z.string().optional(),
    placeOfBirth: z.object({
        city: z.string(),
        state: z.string(),
        country: z.string()
    }),
    sex: z.enum(["M", "F"]),
    nationality: z.string().optional(),
    identityDocumentType: z.string().optional(),
    identityDocumentNumber: z.string().optional(),
    identityDocumentExpirationDate: z.coerce.date().optional(),
    school: z.string().optional(),
    schoolYear: z.string().optional(),
    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional(),
});
