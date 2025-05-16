import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";

export default function AppSidebar() {
    return (
        <div className="flex p-2">
            <SidebarTrigger />
            <p className="pl-2 pr-2">|</p>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to={"/"}>Home</Link>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )}


    