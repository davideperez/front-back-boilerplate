import { useDispatch, useSelector } from 'react-redux'
import { deleteFolderThunk, fetchFoldersThunk } from '@/store/folders.thunks'
import { useCallback, useEffect, useMemo } from "react"
import type { RootState, AppDispatch } from '../../store/store'
import { FoldersDataTable } from '@/components/Folders/FoldersDataTable'
import { folderColumns } from '@/components/Folders/FoldersColumns'
import { ColumnDef } from '@tanstack/react-table'
import { FolderTableRowType } from '@/types/folder'

export function FoldersPage() {
    console.log('FoldersPage rendered, begining')
    const dispatch = useDispatch<AppDispatch>()

    const {
        folders,
        /* pagination, */      
        loading,
        error
    } = useSelector((state: RootState) => state.folders)

    useEffect(() => {
        dispatch(fetchFoldersThunk({ search: '', sortBy: 'firstName', sortOrder: 'asc', page: 1, pageSize: 3 }))
    }, [dispatch])
    
    const onDelete = useCallback(
        async (folderId: string, userId: string) => {
            alert("This is the delete. folderId: "+ folderId +  " userId: " + userId)

            if (!folderId) {
                  return // shouldnt some
            }

            try {
                await dispatch(deleteFolderThunk({ folderId: folderId, userId: "David"})).unwrap()
                
                await dispatch(fetchFoldersThunk({ search: '', sortBy: 'firstName', sortOrder: 'asc', page: 1, pageSize: 3 })).unwrap()
                // 
            } catch (error) {
                console.error("Error during deletion or fetch:", error);
                alert("Hubo un error al intentar eliminar el Legajo.")
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
    console.log('FoldersPage rendered, end')
    
    return (
        <div>
            <FoldersDataTable
                columns={columns}
                data={folders}
            />
        </div>
    )
}
