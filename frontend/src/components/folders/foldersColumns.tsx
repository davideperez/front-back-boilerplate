import { FolderTableRowType } from '../../types/folder'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { RowActions } from './RowActions'
// import { Checkbox } from '../ui/checkbox'

interface FoldersColumnProps {
    onEdit: (folderId: string) => void
    onDelete: (folderId: string, userId: string) => void
}

const columnHelper = createColumnHelper<FolderTableRowType>()

export const folderColumns = ( { onEdit, onDelete }: FoldersColumnProps): ColumnDef<FolderTableRowType>[] => [
   
    /* 1 Profile Picture */
    {
        accessorKey: 'profilePicture',
        header: 'Foto de Perfil',
        cell: ({getValue}) => {
            const src = getValue() as string
            return (
                <div className="flex justify-center items-center w-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={src}/>
                        <AvatarFallback>Imagen del Legajo</AvatarFallback>
                    </Avatar>
                </div>
            )
        },
        meta: {
            className: "flex justify-center items-center min-w-4 max-w-16"
        }
    },
    /* 2 Name and Lastname */
    {
        header: 'Legajo',
        accessorFn: row => `${row.lastName}, ${row.firstName}`,
        id: 'fullName',
        meta: {
            className: "flex flex-col justify-center items-start flex-1 basis-0"
        }
    },
    /* 3 Actualizado el:  */
    /* 4 Row Actions */
    columnHelper.display({
        id: 'actions',
        cell: (props) => 
            <RowActions 
                row={props.row} 
                onDelete={onDelete}
                onEdit={onEdit}
            />,
        meta: {
            className: "flex flex-col justify-center items-center min-w-4 max-w-12"
        }
    })
  ]

// --------------------------------------------------- 
// Legacy Select Code
// --------------------------------------------------- 


 /* Select */
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <>
    //             <Checkbox
    //                 checked={
    //                     table.getIsAllPageRowsSelected() ||
    //                     (table.getIsSomePageRowsSelected() && "indeterminate")
    //                 }
    //                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //                 aria-label="Select all"
    //             />
    //             {/* <input
    //                 type="checkbox"
    //                 checked={table.getIsAllPageRowsSelected()}
    //                 onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
    //             /> */}
    //         </>
    //     ),
    //     cell: ({ row }) => (
    //         <>
    //             <Checkbox 
    //                 checked={row.getIsSelected()}
    //                 onCheckedChange={(value) => row.toggleSelected(!!value)}
    //                 aria-label="Select row"
    //             />
    //             {/* <input
    //                 type="checkbox"
    //                 checked={row.getIsSelected()}
    //                 disabled={!row.getCanSelect()}
    //                 onChange={(e) => row.toggleSelected(e.target.checked)}
    //             /> */}
            
    //         </>
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //     meta: {
    //         className: "flex flex-col justify-center items-center min-w-4 max-w-16",
    //     }
    // },