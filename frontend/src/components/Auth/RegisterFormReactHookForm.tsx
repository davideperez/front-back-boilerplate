import { useForm } from "react-hook-form"

export const RegisterFormReactHookForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit( data => {
        // console.log(data)
    })

    return (
        <>
            <form
                className="flex flex-col w-100 m-10 gap-2 align-center"
                onSubmit={onSubmit}
            >
                {/* Name */}
                <label>Name</label>
                <input 
                    type='text'
                    {...register('name', 
                        { 
                            required: {
                                value: true,
                                message: 'Name is required'
                            }, 
                            maxLength: {
                                value: 40,
                                message: 'Name must be less than 20 characters'
                            },
                            minLength: {
                                value: 2,
                                message: 'Name must be more than 2 characters'
                            }
                        })
                    }
                />
                {errors.name?.type === "required" && <span>Name is required</span>}
                {errors.name?.type === "maxLength" && <span>Name must be less than 30 characters</span>}
                {errors.name?.type === "minLength" && <span>Name must be more than 2 characters</span>}
                
                {/* Lastname */}
                <label>Lastname</label>
                <input 
                    type='text'
                    {...register('lastname', 
                        { 
                            required: {
                                value: true,
                                message: 'Lastname is required'                            
                            },
                            maxLength: {
                                value: 30,
                                message: 'Lastname must be less than 30 characters'
                            },
                            minLength: {
                                value: 2,
                                message: 'Lastname must be more than 2 characters'
                            }
                        })
                    }
                />
                {
                    errors.lastname && 
                    <span>
                        {errors.lastname.message && 
                            typeof errors.lastname.message === 'string'
                                ? errors.lastname.message 
                                : null
                        }
                    </span>
                }

                {/* Email */}
                <label>Email</label>
                <input 
                    type='email'
                    {...register('email', 
                        { 
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email format'
                            }
                        })
                    }
                />
                {errors.email && <span>{errors.email.message && (typeof errors.email.message === "string"? errors.email.message : null)}</span>}
                
                {/* Password */}
                <label>Password</label>
                <input 
                    type='password' 
                    {...register('password', 
                        { 
                            required: {
                                value: true,
                                message: 'Password is required'
                            },
                            maxLength: {
                                value: 20,
                                message: 'Password must be less than 20 characters'
                            },
                            minLength: {
                                value: 8,
                                message: 'Password must be more than 8 characters'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                            },
                        })
                    }
                />
                {errors.email && <span>{errors.email.message && typeof errors.email.message === "string"? errors.email.message : null}</span>}
                
                {/* Confirm Password */}
                <label>Confirm Password</label>
                <input 
                    type='password' 
                    {...register('confirm-password', 
                        { 
                            required: {
                                value: true,
                                message: 'Confirm Password is required'
                            },
                            validate: value => value === 'password' || 'The passwords do not match'
                        })
                    }
                />

                {/* Submit Button */}
                <button type="submit">Register</button>
            </form>
        </>
    )
}
