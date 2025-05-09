import { z } from 'zod';

export const paginationQuerySchema = z.object({
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    items: z.coerce.number().min(1).default(10),
}).strict();