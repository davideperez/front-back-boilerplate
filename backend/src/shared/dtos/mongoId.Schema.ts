//TODO: Is this really necesary? Doesnt mongo have a type or somethng?
import { z } from "zod"

export const MongoIdSchema = z.string().min(1, "ID is required")