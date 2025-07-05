import { Card } from "../ui/card"
import { FolderDetailType } from "@/types/folder"
import { Separator } from "../ui/separator"
import { h3, h4, large } from "../styles"
import { format } from "date-fns/format"
import { formatDistance  } from "date-fns"
import { es } from "date-fns/locale"
import { Avatar, AvatarImage,AvatarFallback } from "../ui/avatar"
import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
// import { useEffect, useState } from "react"

interface FolderDescriptionProps {
    folder: FolderDetailType | null
}

export function FolderDescription ({ folder }: FolderDescriptionProps ) {
    console.log("Folder Description > folder", folder)
    /* const [ folderData, setFolderData ] = useState()
    
    useEffect(() => {
        if (!folder) return

        setFolderData(folder?.folder)
    }, []) */
    return (
        <div>
            {folder ? (
                <div className="flex flex-col gap-4">
                    <Card className="flex flex-col p-5 gap-2">
                        <div className="flex flex-row justify-between">
                            <Avatar className="h-auto min-w-32 ">
                                <AvatarImage src={folder?.profilePicture}/>
                                <AvatarFallback>Foto del Legajo</AvatarFallback>
                            </Avatar>
                            {/* Copy Info Button */}
                            <Button variant="secondary" className="h-min w-2" >
                                <CopyIcon  />
                            </Button>
                        </div>
                        <h4 className={`${h4} mb-2`}>Información Básica</h4>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Nombre y Apellido: </p>
                            <p> {folder?.firstName} {folder?.lastName}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Sexo: </p>
                            <p> {`${folder?.sex === "F" ? "Mujer" : "Hombre"}`}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Edad: </p>
                            <p> {formatDistance(
                                Date.now(),
                                new Date(folder?.birthDate),
                                {locale:es}
                            )}</p>
                        </div>
                        
                        
                        <Separator className="mt-2"/>
                        <h4 className={`${h4} mb-2 mt-2`}>Nacimiento</h4>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Fecha: </p>
                            <p> {format(
                                folder?.birthDate, 
                                "PPP",
                                {locale:es}
                            )}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Lugar: </p>
                            <p> {`${folder?.city}, ${folder?.state}, ${folder?.country}`}</p>
                        </div>


                        <Separator className="mt-2"/>
                        <h4 className={`${h4} mb-2 mt-2`}>Documento de Identidad</h4>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Tipo: </p>
                            <p> {`${folder?.identityDocumentType}`}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Número: </p>
                            <p> {`${folder?.identityDocumentNumber}`}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Nacionalidad: </p>
                            <p> {`${folder?.nationality}`}</p>
                        </div>


                        <Separator className="mt-2"/>
                        <h4 className={`${h4} mb-2 mt-2`}>Escolaridad</h4>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Escuela: </p>
                            <p> {`${folder?.school}`}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p className={large}>Año escolar: </p>
                            <p> {`${folder?.schoolYear}`}</p>
                        </div>
                    </Card>
                </div>
            ): (
                <p>Loading...</p>
            )
            
            }
        </div>
    )
}

