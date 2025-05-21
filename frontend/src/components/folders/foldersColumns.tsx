import { FolderTableRowType } from '../../types/folder'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { RowActions } from './RowActions'
import transformDate from '@/lib/transformDate'
import { Checkbox } from '../ui/checkbox'

const columnHelper = createColumnHelper<FolderTableRowType>()


export const folderColumns: ColumnDef<FolderTableRowType>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
                {/* <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
                /> */}
            </>
        ),
        cell: ({ row }) => (
            <>
                <Checkbox 
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
                {/* <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={(e) => row.toggleSelected(e.target.checked)}
                /> */}
            
            </>
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
        }
    },
    {
        accessorKey: 'firstName',
        header: 'Nombre',
    },
       {
        accessorKey: 'lastName',
        header: 'Apellido',
    },
           {
        accessorKey: 'createdAt',
        header: 'Creado',
        cell: ({ getValue }) => {
            const value = getValue() as string
            return transformDate(value)
        }
    }, 
    {
        accessorKey: 'updatedAt',
        header: 'Actualizado',
        cell: ({ getValue }) => {
            const value = getValue() as string
            return transformDate(value)
        }
    },
    columnHelper.display({
        id: 'actions',
        cell: props => <RowActions row={props.row} />,
    })
  ]