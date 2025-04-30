// import { RegisterFormReactHookForm } from "@/components/Auth/RegisterFormReactHookForm";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/login')
    }
    return (
        <RegisterForm onSuccess={handleSubmit} />
    )
}