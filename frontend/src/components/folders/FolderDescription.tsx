import { Card } from "../ui/card"
import { es } from "date-fns/locale"
import { Button } from "../ui/button"
import { format } from "date-fns/format"
import { h3, h4, large } from "../styles"
import { formatDistance  } from "date-fns"
import { Separator } from "../ui/separator"
import { FolderDetailType } from "@/types/folder"
import { useNavigate, useParams } from 'react-router-dom'
import { CopyIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Avatar, AvatarImage,AvatarFallback } from "../ui/avatar"

// import { useEffect, useState } from "react"

interface FolderDescriptionProps {
    folder: FolderDetailType | null
}

export function FolderDescription ({ folder }: FolderDescriptionProps ) {
    /* const [ folderData, setFolderData ] = useState()
    
    useEffect(() => {
        if (!folder) return

        setFolderData(folder?.folder)
    }, []) */
    const navigate = useNavigate()
    const { folderId } = useParams<{ folderId: string }>()
    
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
                            <div className="flex gap-2">
                                <Button variant="secondary" className="h-min w-2" >
                                    <CopyIcon  />
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    className="h-min w-2" 
                                    onClick={ (e) => {
                                            e.stopPropagation();
                                            console.log("Clicked the edit button for row.original._id: ")
                                            navigate(`/folder/${folderId}/edit`)
                                        }
                                    }
                                >
                                    <Pencil1Icon  />
                                </Button>
                            </div>
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

