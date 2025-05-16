import { Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => (
    <Routes>
        {PublicRoutes()}
        {ProtectedRoutes()}
    </Routes>
)

export default AppRoutes;