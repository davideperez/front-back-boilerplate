import { Home, Folder, User, Settings, LogOut } from "lucide-react"

import { 
    Sidebar,
    SidebarMenu, 
    SidebarGroup,
    SidebarHeader, 
    SidebarContent, 
    SidebarMenuItem,
    SidebarMenuButton, 
    SidebarGroupLabel, 
    SidebarGroupContent,
    SidebarRail
} from "../ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Legajos",
    url: "/folders",
    icon: Folder,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: User,
  },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
},
{
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

export default function AppSidebar({ ...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Gestor de Legajos</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map( (item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
