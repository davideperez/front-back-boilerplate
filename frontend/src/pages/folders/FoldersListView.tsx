import { useDispatch, useSelector } from 'react-redux'
import { fetchFolders } from "@/store/foldersSlice"
import { useEffect } from "react"
import type { RootState, AppDispatch } from '../../store/store'



export function FoldersListView() {
    // Dispatch is used to send to the Redux store the actions.
    // In this case, the dispatch is going to call the backend and fetch the data
    // storing it on the store. 
    const dispatch = useDispatch<AppDispatch>()
    console.log('/src/pages/folders/FoldersListView.tsx > dispatch: ', dispatch)

    // useSelector is used to read the Redux store. You give it the complete state
    // and it returns to you the part of the state you are interesting in.
    // RootState is the type of the state of the store so TS can give you autocomplete. 
    // This way also you are always in the know of what the global state can offer.
    const { 
        folders, 
        pagination, 
        loading, 
        error
    } = useSelector((state: RootState) => state.folders)

    // Once the component is mounted the dispatched fetchFolders method of the store is executed. 

    useEffect(() => {
        dispatch(fetchFolders({ search: '', sortBy: 'firstName', sortOrder: 'asc', page: 1, pageSize: 3 }))
    }, [dispatch])

    if (loading) return <p>Cargando legajos...</p>
    if (error) return <p>Error: {error}</p>

    console.log('/src/pages/folders/FoldersListView.tsx > useSelector > folders: ', folders)
    return (
        <div className="flex flex-col gap-4 p-4">
            <h3>Legajos</h3>
            <table>
                <tbody>
                    {
                        folders.map(folder => (
                            <tr key={folder._id}>
                                <td>{folder.firstName} {folder.lastName}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <p>Pagina Actual: {pagination.page}</p>
            <p>Tamaño Página: {pagination.pageSize}</p>
            <p>Paginas: {pagination.totalPages}</p>
            <p>Legajos Totales: {pagination.totalItems}</p>
        </div>
    )
}


