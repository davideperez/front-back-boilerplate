import { useDispatch, useSelector } from 'react-redux'
import { deleteFolderThunk, fetchFoldersThunk } from '@/store/folders.thunks'
import { useCallback, useEffect, useMemo } from "react"
import type { RootState, AppDispatch } from '../../store/store'
import { FoldersDataTable } from '@/components/Folders/FoldersDataTable'
import { folderColumns } from '@/components/Folders/FoldersColumns'
import { ColumnDef } from '@tanstack/react-table'
import { FolderTableRowType } from '@/types/folder'
import { toast } from 'sonner'

const provisoryQuery: {
    sortBy: "firstName" | "lastName" | "createdAt" | "updatedAt"
    search?: string
    sortOrder?: "asc" | "desc"
    page?: number
    pageSize?: number
} = { 
    sortBy: 'firstName',
    search: '', 
    sortOrder: 'asc', 
    page: 1, 
    pageSize: 50 
}

export function FoldersPage() {

    const dispatch = useDispatch<AppDispatch>()

    const {
        folders,
        /* pagination, */      
        loading,
        error
    } = useSelector((state: RootState) => state.folders)

    useEffect(() => {
        dispatch(fetchFoldersThunk(provisoryQuery))
    }, [dispatch])
    
    const onDelete = useCallback(
        async (folderId: string, userId: string) => {
            if (!folderId) {
                  return // shouldnt some
            }

            try {
                const deletedFolder = await dispatch(deleteFolderThunk({ folderId: folderId, userId: "David"})).unwrap()
                
                await dispatch(fetchFoldersThunk(provisoryQuery)).unwrap()
                toast.success(`El legajo de ${deletedFolder.firstName} ${deletedFolder.lastName} fue eliminado correctamente`) // TODO: IMPORTANT: Prompt the user if he is sure. 
            } catch (error) {
                console.error("Error during deletion or fetch:", error);
                toast.warning("Hubo un error al intentar eliminar el Legajo.")
            }
        },
        [dispatch]
    )

    const onEdit =  useCallback(
        (folderId: string) => {
            alert("This is the delete. folderId: "+ folderId)
        }, 
        []
    )
    
    const columns: ColumnDef<FolderTableRowType>[] = useMemo(() => folderColumns({ onEdit, onDelete }), [onEdit, onDelete])
    
    if (loading) return <p>Cargando legajos...</p>
    if (error) return <p>Error: {error}</p>
    
    return (
        <div>
            <FoldersDataTable
                columns={columns}
                data={folders}
            />
        </div>
    )
}
