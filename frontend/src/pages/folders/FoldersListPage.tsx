import { useCallback, useEffect, useMemo } from "react"

import { FolderTableRowType } from '@/types/folder'
import { toast } from 'sonner'

/* Redux */
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store'
import { deleteFolderThunk, fetchFoldersThunk } from '@/store/folders.thunks'

/* Table TanStack */
import { ColumnDef } from '@tanstack/react-table'
import { folderColumns } from '@/components/Folders/FoldersColumns'
import { FoldersTable } from '@/components/Folders/FoldersTable'

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
    // ------------------------------------- Redux Store Extraction: data, errors and loading state ----------------------------------
    const {
        folders,
        pagination,
        loading,
        error
    } = useSelector((state: RootState) => state.folders)
    /* console.log("--------------------------------------------------------------------")
    console.log("FoldersListPage.tsx > FoldersPage > folders: ", folders)
    console.log("FoldersListPage.tsx > FoldersPage > pagination: ", pagination)
    console.log("FoldersListPage.tsx > FoldersPage > loading: ", loading)
    console.log("FoldersListPage.tsx > FoldersPage > error: ", error)
    console.log("--------------------------------------------------------------------") */
    // ------------------------------------- Redux Thunk: Fetches Folders on First Mount ----------------------------------------------------------
    
    // Inicializa el dispatch tipado para lanzar acciones async (thunks) del store
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchFoldersThunk(provisoryQuery))
    }, [dispatch])

    // ------------------------------------- Redux Set Pagination Method -------------------------------------------------------------------
    
    const setPagination = useCallback(
        /* 1 Recieves pagination query */
        async ({ pageIndex, pageSize }: {pageIndex: number, pageSize: number}) => {
            // TODO: Should I validate in some what pagination?
            /* 2 Creates new query object based on that pagination change */
            const newPageSize = Number(pageSize)
            const query = {
                ...provisoryQuery,
                page: pageIndex + 1,
                pageSize: newPageSize,
            }
            
            /* 3 Dispatches the fethicng folders thunk with the built query */
            await dispatch(fetchFoldersThunk(query))
        },
        [dispatch]
    )
    
    // ------------------------------------- onDelete ---------------------------------------------------------------------------------
    const onDelete = useCallback(
        async (folderId: string, userId: string) => {
            if (!folderId) {
                  return // TODO: shouldnt some
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
  
    // ------------------------------------- table columns building -------------------------------------------------------
    
    const columnsInstance = useMemo( // TODO: Adjust the type.
        () => folderColumns({ onDelete }),
        [onDelete]
    )
    
    // ------------------------------------- Exception logic -------------------------------------------------------
    
    if (loading) return <p>Cargando legajos...</p>
    if (error) return <p>Error: {error}</p>
    
    return (
        <div>
            <FoldersTable 
                columns={columnsInstance}
                data={folders}
                pagination={pagination}
                setPagination = {setPagination}
            />
        </div>
    )
}
