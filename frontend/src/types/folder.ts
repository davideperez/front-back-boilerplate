import { z } from "zod";

// 1 Read a Full Folder
//TODO: Analyize if perhaps is better to create a type for the reading, another for the creation and another for de editing the folder.
export const FolderDetailSchema = z.object({
    _id: z.string().optional(),
    firstName: z.string().min(1, "El nombre es requerido."),
    lastName: z.string().min(1, "El apellido es requerido."),
    birthDate: z.coerce.date({
    invalid_type_error: "La fecha de nacimiento es requerida."
  }),
    profilePicture: z
        .any()
        .refine(file => file instanceof File, {
                message: "La foto de Legajo es requerida.",
            }
        )
        .optional(), // TODO: IMPORTANT: Limit this to 4mb
    placeOfBirth: z.object({
        city: z.string().min(1, "La ciudad de nacimiento es requerida.") ,
        state: z.string().min(1, "La provincia o estado de nacimiento es requerido") ,
        country: z.string().min(1, "El país de nacimiento es requerido.") ,
    }),
    sex: z.enum(["M", "F"], {
        errorMap: () => ({ message: "El sexo es requerido."})
    }),
    nationality: z.string().min(1, "El nombre es requerido.") ,
    identityDocumentType: z.enum(["DNI", "Pasaporte", "Cedula de Identidad", "En Proceso"], { // TODO: IMPORTANT Implement this enum in the backend.
        errorMap: () => ({ message: "El tipo de identificación es requerido."})
    }),
    identityDocumentNumber: z.string().min(1, "El número de identificación es requerido."), // TODO: IMPORTANT: IF the document is in process dont show this field. 
    identityDocumentExpirationDate: z.coerce.date({
        invalid_type_error: "La fecha de expiración del documento es requerida"
    }) /* .optional() */,
    school: z.string().min(1, "El nombre es requerido."),
    schoolYear: z.string().min(1, "El nombre es requerido."),
    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional(),
    deletedAt: z.date().optional(), // TODO: Differentiate types for each usecase.
    deletedBy: z.string().optional(),
})

export type FolderDetailType = z.infer<typeof FolderDetailSchema>


// 2 Get All Folders Response: Schema and Type
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


// 3 Folders Table Row Schema and Type
export const FolderTableRowSchema = FolderDetailSchema.pick({
    _id: true,
    firstName: true,
    lastName: true,
    profilePicture: true,
   /*  createdAt: true,
    updatedAt: true, */
})

export type FolderTableRowType = z.infer<typeof FolderTableRowSchema>

// 4 Request
const validSortFields = ['firstName', 'lastName', 'createdAt', 'updatedAt'] as const

export const GetFoldersParamsTypeSchema = z.object({
    search: z.string().optional(),
    sortBy: z.enum(validSortFields).default('updatedAt'),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
});

export type GetFoldersParamsType = z.infer<typeof GetFoldersParamsTypeSchema>

// 5 Create
export const CreateFolderFormSchema = FolderDetailSchema.pick({
    _id: true,
    firstName: true,
    lastName: true,
    birthDate: true,
    profilePicture: true,
    city: true,
    state: true,
    country: true,
    sex: true,
    nationality: true,
    identityDocumentType: true,
    identityDocumentNumber: true,
    identityDocumentExpirationDate: true,
    school: true,
    schoolYear: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true, // TODO: Differentiate types for each usecase.
    deletedBy: true,
})

export type CreateFolderFormType = z.infer<typeof CreateFolderFormSchema>;

// 6 Folder Pagination
export interface PaginationInterface { //TODO: Should this one be implemented with zod?
    page: number, 
    pageSize: number,
    totalPages: number,
    totalItems: number
}