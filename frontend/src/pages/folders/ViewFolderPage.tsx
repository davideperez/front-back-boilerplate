import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import { getFolder } from "@/api/folders-api"
import { FilesTable } from "@/components/Files/FilesTable"
import { FolderDescription } from "@/components/Folders/FolderDescription"
import { FolderDetailType } from "@/types/folder"
import { h2 } from "@/components/styles"

export function ViewFolderPage() {

    console.log('Hi from ViewFolderPage!')
    
    const { folderId } = useParams<{ folderId: string }>()
    
    const [ folder, setFolder ] = useState<FolderDetailType | null>(null)

    useEffect(() => {
        if (!folderId) return

        const fetchFolder = async () => { // TODO: Change it to Redux
            try {
                const folderData: { message: string, data: FolderDetailType } = await getFolder(folderId)
                
                console.log("ViewFolderPage.tsx > useEffect > getFolder > folderData: ", folderData)
                
                if (!folderData) {
                    console.error("No folder Data")
                    return
                }

                setFolder(folderData.data)
            }
            catch (error) {
                console.error("Error fetching folder:", error)
            }
        }
        
        fetchFolder()
    }, [folderId])
    
    return (
        <div className="flex gap-4 p-4">
            {/* Title */}
            {/* <h1>This is the folderId: {folderId}</h1> */}
            {folder ? (
                <div className="flex flex-col w-full">
                    <h2 className={`${h2} mb-4`}>Legajo de {folder?.firstName} {folder?.lastName}</h2>
                    <div className="flex gap-4 w-full">
                        <div className="w-auto">
                            <FolderDescription folder={folder} />
                        </div>
                        <div className="flex-grow">
                            <FilesTable folder={folder} />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading folder...</p>
            )}
        </div>
    )
}

