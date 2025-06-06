import AppSidebar from "./AppSidebar";

import { Outlet, /* useLocation */ } from "react-router-dom";



import { Separator } from "@/components/ui/separator"

import { 
    SidebarTrigger,
    SidebarProvider,
    SidebarInset,
} from "../ui/sidebar";
import { ModeToggle } from "../ui/mode-toggle";
// import AppBreadcrumb from "./AppBreadcrumb";


export default function MainLayout() {
    // const location = useLocation()
    // console.log('Location: ', location)
    return (
        <SidebarProvider className="w-screen">
            <AppSidebar />
            <SidebarInset 
                className="
                    flex 
                    w-screen
                    rounded-xl 
                "
            >
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                    <div className="flex items-center">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        {/* <AppBreadcrumb 
                            location={location}
                        /> */}
                    </div>
                    <div>
                        <ModeToggle />
                    </div>
                </header>
                <main 
                    className="
                        flex 
                        flex-1 
                        flex-col 
                        gap-4 
                        p-4
                    "
                >
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div> */}
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4" >
                        <Outlet />  
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

