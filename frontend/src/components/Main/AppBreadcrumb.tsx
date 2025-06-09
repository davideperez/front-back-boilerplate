  import { useLocation } from "react-router-dom";
import { 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    // BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
  
const breadcrumbMap: Record<string, string> = {
  '': 'Inicio',
  '/users': 'Usuarios',
  '/folders': 'Legajos',
  '/folders/crear': 'Nuevo Legajo',
  '/settings': 'Configuración',
};

  export default function AppBreadcrumb () {
    const location = useLocation()
    const path = location.pathname

    const segments = path.split('/')

    const paths = segments.map(
        (_, i) => {
            return segments.slice(0, i + 1).join('/');
        }
    )
    // console.log('This is paths: ', paths)

    return (
        //TODO: Improve this breadcrumb to be really dynamic. 
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbSeparator className="hidden md:block"/>
                {paths.map((p, i) => (
                    <BreadcrumbItem key={p}>
                        <BreadcrumbLink href={p} >
                            {breadcrumbMap[p] || p}
                        </BreadcrumbLink>
                        {i < paths.length - 1 && <BreadcrumbSeparator className="hidden md:block" key={p}/>}
                    </BreadcrumbItem>
                ))}
             {/*    <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block"/>
                <BreadcrumbItem>
                    <BreadcrumbPage>{paths}</BreadcrumbPage>
                </BreadcrumbItem> */}
            </BreadcrumbList>
        </Breadcrumb>
    )
  }