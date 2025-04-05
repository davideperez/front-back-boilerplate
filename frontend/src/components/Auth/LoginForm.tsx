import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormDescription, /* FormDescription ,*/ FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"
import { z, ZodSchema } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { login } from "@/api/axios"

const loginFormSchema: ZodSchema = z
.object({
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

})

type LoginFormType = z.infer<typeof loginFormSchema>;

type LoginFormProps = {
    onSuccess: () => void
}   

export const LoginForm = ({ onSuccess} : LoginFormProps ) => {
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = form.handleSubmit((values: LoginFormType) => {
        console.log('This are the form values: ', values)
        // TODO: Send the form values to the backend
        login(values)
        onSuccess()
    })

    return (
        <Card className="m-8 px-12 py-10 w-auto">
            <CardHeader>
                <CardTitle>
                    Login
                </CardTitle>
                <CardDescription>
                    Please enter your credentials to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
                        {/* Email */}
                        <FormField 
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    {form.formState.errors?.email && 
                                        <FormDescription>
                                            {
                                                String(form.formState.errors?.email.message || '')
                                            }
                                        </FormDescription>
                                    }
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField 
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    {form.formState.errors?.password && 
                                        <FormDescription>
                                            {
                                                String(form.formState.errors?.password.message || '')
                                            }
                                        </FormDescription>
                                    }
                                </FormItem>
                            )}
                        />
                        {/* Submit Button */}
                        <Button>Login</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}