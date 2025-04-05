import { z, ZodSchema } from "zod"

export const registerFormSchema: ZodSchema = z
.object({
    firstName: z
        .string({
            required_error: 'Name is required'
        })
        .min(2, 'Name must be at least 2 characters long')
        .max(32, 'Name must be at most 32 characters long')
        .regex(/^[a-zA-Z]+$/, 'Name must contain only letters'),
    lastName: z
        .string({
            required_error: 'Lastname is required'
        })
        .min(2, 'Name must be at least 2 characters long')
        .max(32, 'Name must be at most 32 characters long')
        .regex(/^[a-zA-Z]+$/, 'Name must contain only letters'),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email(),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(8, 'Password must be at least 8 characters long')
        .max(32)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter and one number'),
    confirmPassword: z
        .string({
            required_error: 'Confirm Password is required'
        })
        .min(8, 'Confirm Password must be at least 8 characters long')
        .max(32, 'Confirm Password must be at most 32 characters long')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Confirm Password must contain at least one uppercase letter, one lowercase letter and one number')
})
.superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
        })
    }
})