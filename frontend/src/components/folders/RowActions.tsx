import { Row } from '@tanstack/react-table'
import { FolderTableRowType } from '../../types/folder'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'

type RowActionsProps = {
  row: Row<FolderTableRowType>
}

export function RowActions({ row }: RowActionsProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log('Editar', row.original)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log('Eliminar', row.original)}
          className="text-red-600"
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
