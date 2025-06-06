import { z } from "zod";

// Read a Full Folder

export const FolderDetailSchema = z.object({
    _id: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.coerce.date(),
    profilePicture: z.string().optional(),
    placeOfBirth: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional()
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
    deletedAt: z.date().optional(), // TODO: Differentiate types for each usecase.
    deletedBy: z.string().optional(),
})

export type FolderDetailType = z.infer<typeof FolderDetailSchema>


// Read ll Folders Response

export const getAllFoldersResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        items: z.array(FolderDetailSchema)/* .optional() */, 
        pagination: z.object({
            page: z.number(),
            pageSize: z.number(),
            totalPages: z.number(),
            totalItems: z.number(),
        })/* .optional() */ // TODO: Review this optional()s here. Should the schema be stricter?
    })
})

export type getAllFoldersResponseType = z.infer<typeof getAllFoldersResponseSchema>


// Read a Table Row Folder

export const FolderTableRowSchema = FolderDetailSchema.pick({
    _id: true,
    firstName: true,
    lastName: true,
    profilePicture: true,
   /*  createdAt: true,
    updatedAt: true, */
})

export type FolderTableRowType = z.infer<typeof FolderTableRowSchema>


// Request

const validSortFields = ['firstName', 'lastName', 'createdAt', 'updatedAt'] as const

export const GetFoldersParamsTypeSchema = z.object({
    search: z.string().optional(),
    sortBy: z.enum(validSortFields).default('updatedAt'),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
});

export type GetFoldersParamsType = z.infer<typeof GetFoldersParamsTypeSchema>