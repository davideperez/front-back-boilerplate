import { Row } from '@tanstack/react-table'
import { FolderTableRowType } from '../../types/folder'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
// import { AppDispatch } from '@/store/store'
// import { useDispatch } from 'react-redux'
// import { deleteFolderThunk } from '@/store/folders.thunks'

type RowActionsProps = {
  row: Row<FolderTableRowType>,
  onEdit: (folderId: string) => void
  onDelete: (folderId: string, userId: string) => void
}

export function RowActions({ row, onEdit, onDelete }: RowActionsProps) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onEdit(row.original)}
        >
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(row.original._id, "David")}
          className="text-red-600"
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
