import { useEffect, useState } from "react";

interface FormData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterFormReactHookForm: React.FC = () => {
    // Form memory state
    const [formData, setFormData] = useState<FormData>({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Form change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Form submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('Form sent: ', formData);
    }

    useEffect(() => {
        // console.log('Form data: ', formData);
    }, [formData]);

return (
    <>
        <form 
            className="flex flex-col w-100 m-10 gap-2 align-center" 
            onSubmit={handleSubmit}
            >
            {/* Name */}
            <label>Name</label>
            <input 
                type='text' 
                name='name'
                onChange={handleChange}
            />

            {/* Lastname */}
            <label>Lastname</label>
            <input type='text' name='lastname'/>
            
            {/* Email */}
            <label>Email</label>
            <input type='email' name='email'/>
            
            {/* Password */}
            <label>Password</label>
            <input type='password' name='password'/>
            
            {/* Confirm Password */}
            <label>Confirm Password</label>
            <input type='password' name='confirm-password'/>
            <button type="submit">Register</button>
        </form>
    </>
)
}

