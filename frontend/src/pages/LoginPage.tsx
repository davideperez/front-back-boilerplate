// import { LoginFormReactHookForm } from "@/components/Auth/LoginFormReactHookForm";
import { LoginForm } from "@/components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";


export function LoginPage() {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/')
    }
    return (
        <LoginForm onSuccess={handleSubmit} />
    )
}