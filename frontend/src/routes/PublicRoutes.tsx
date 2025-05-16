import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { Route } from "react-router-dom"

const PublicRoutes = () => (
    <>
        <Route path="register" element={<RegisterPage />} />
        <Route path="register" element={<LoginPage />} />
    </>
)

export default PublicRoutes;