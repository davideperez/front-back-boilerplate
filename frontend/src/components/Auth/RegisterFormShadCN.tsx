import { Card } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm } from "react-hook-form"

export const RegisterFormShadCN = () => {
    const form = useForm({
        defaultValues: {
            name: "John",
            lastname: "Doe",
            email: "johndoe@email.com",
            password: "",
            confirmPassword: ""
        }
    })

    return (
        <Card className="m-8 px-12 py-10 w-auto">
            <Form {...form}>
                <form className="flex flex-col gap-y-2">

                    {/* Name */}
                    <FormField 
                        name="name" 
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <input type="text" {...field} />
                                </FormControl>
                                <FormDescription>Enter your full name</FormDescription>
                            </FormItem>
                        )}
                    />
                    
                    {/* Lastname */}
                    <FormField
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                    <input type="text" {...field} />
                                </FormControl>
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
                                    <input type="email" {...field} />
                                </FormControl>
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
                                    <input type="password" {...field} />
                                </FormControl>
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
                                    <input type="password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
   
                    {/* Submit Button */}
                    <button>Register</button>
                </form>
            </Form>
        </Card>
    )
}