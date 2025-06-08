import { z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form, FormControl, FormDescription, /* FormDescription ,*/ FormField, FormItem, FormLabel } from "../ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

import { register } from "@/api/users-api"
import { registerFormSchema } from "@/schemas/registerFormSchema"

type RegisterFormType = z.infer<typeof registerFormSchema>;

type RegisterFormProps = {
    onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = form.handleSubmit((values: RegisterFormType) => {
        register(values)
        onSuccess()
        // console.log("RegisterForm > onSubmit > values: ", values)
        // console.log("RegisterForm > onSubmit > typeof values: ", typeof values)
    })

    return (
        <Card className="m-8 px-12 py-10 w-auto">
            <CardHeader>
                <CardTitle>
                    Registrarse
                </CardTitle>
                <CardDescription>
                    Create an account to start using our services
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>

                        {/* Name */}
                        <FormField 
                            name="firstName" 
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    {form.formState.errors?.firstName && 
                                        <FormDescription>
                                            {
                                                String(form.formState.errors?.firstName.message || '')
                                            }
                                        </FormDescription>
                                    }
                                </FormItem>
                            )}
                        />
                        
                        {/* Lastname */}
                        <FormField
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Lastname</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    {form.formState.errors.lastName &&
                                        <FormDescription>
                                            {
                                                String(form.formState.errors?.lastName.message || '')
                                            }
                                        </FormDescription>
                                    }
                                </FormItem>
                            )}
                        />
                    
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
                        
                        {/* Confirm Password */}
                        <FormField 
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    {form.formState.errors?.confirmPassword && 
                                        <FormDescription>
                                            {
                                                String(form.formState.errors?.confirmPassword.message || '')
                                            }
                                        </FormDescription>
                                    }
                                </FormItem>
                            )}
                        />
    
                        {/* Submit Button */}
                        <Button>Register</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}