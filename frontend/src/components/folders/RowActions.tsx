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
import { useNavigate } from 'react-router-dom'
// import { AppDispatch } from '@/store/store'
// import { useDispatch } from 'react-redux'
// import { deleteFolderThunk } from '@/store/folders.thunks'

type RowActionsProps = {
  row: Row<FolderTableRowType>,
  onDelete: (folderId: string, userId: string) => void
}

export function RowActions({ row, onDelete }: RowActionsProps) {
    const navigate = useNavigate()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={ (e) => {
              e.stopPropagation();
              console.log("Clicked the edit button for row.original._id: ", row.original._id)
              navigate(`/folder/${row.original._id}/edit`)
          }}
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
