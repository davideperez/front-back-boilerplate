import { RowActions } from './RowActions'
import { FolderTableRowType } from '../../types/folder'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
// import { Checkbox } from '../ui/checkbox'

interface FoldersColumnProps {
    onDelete: (folderId: string, userId: string) => void
}

const columnHelper = createColumnHelper<FolderTableRowType>()

export const folderColumns = ({ onDelete }: FoldersColumnProps): ColumnDef<FolderTableRowType>[] => [
   
    /* 1 Profile Picture */
    {
        accessorKey: 'profilePicture',
        header: 'Foto de Perfil',
        cell: ({getValue}) => {
            const src = getValue() as string
            return (
                <div className="flex justify-center items-center w-full">
                    <Avatar className="h-12 w-12">
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
    /* 3 Ultima modificación:  */
    //TODO: Add last modified.
    /* 4 Row Actions */
    columnHelper.display({
        id: 'actions',
        cell: (props) => 
            <RowActions 
                row={props.row} 
                onDelete={onDelete}
            />,
        meta: {
            className: "flex flex-col justify-center items-center min-w-4 max-w-12"
        }
    })
  ]
