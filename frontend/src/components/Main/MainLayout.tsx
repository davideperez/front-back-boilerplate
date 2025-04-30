import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
    return (
        <div >
            <Sidebar />
            <main>
                <Header />
                <Outlet />
                <Footer />
            </main>
        </div>
    )
}
