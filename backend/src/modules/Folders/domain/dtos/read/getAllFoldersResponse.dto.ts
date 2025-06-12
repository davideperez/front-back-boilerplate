import { FolderSchema } from '../../folders.entity';
import { z } from 'zod';

//-------------------- 1 -------------------------//
export const GetFoldersFromDBResponseSchema = z.object({
    folders: z.array(FolderSchema),
    totalItemsCount: z.number(),
});

export type GetFoldersFromDBResponseDTO = z.infer<typeof GetFoldersFromDBResponseSchema>;

//-------------------- 2 -------------------------//

// TODO: VALIDATION: Should the optionsl here be optional? re evalute this. How strict should it be?

export const validSortFields = ['firstName', 'lastName', 'createdAt', 'updatedAt'] as const

export const GetFoldersFromDBRequestSchema = z.object({
    search: z.string().optional(),
    sortBy: z.enum(validSortFields).default('updatedAt'),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    skip: z.number().optional(),
    limit: z.number().optional(),
});

export type GetFoldersFromDBRequestDTO = z.infer<typeof GetFoldersFromDBRequestSchema>;



//-------------------- 3 -------------------------//

export const GetAllFoldersQuerySchema = z.object({
    page: z
      .preprocess((val) => Number(val), z.number().int().min(1))
      .optional()
      .default(1),
    pageSize: z
      .preprocess((val) => Number(val), z.number().int().min(1).max(100))
      .optional()
      .default(10),
    search: z
      .string()
      .optional()
      .default(''),
    sortBy: z
      .enum(validSortFields)
      .optional()
      .default('updatedAt'),
    sortOrder: z
      .enum(["asc", "desc"])
      .optional()
      .default('asc'),
  });

export type GetAllFoldersQueryDTO = z.infer<typeof GetAllFoldersQuerySchema>;