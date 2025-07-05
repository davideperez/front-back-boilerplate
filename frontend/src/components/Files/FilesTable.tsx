import { FolderDetailType } from "@/types/folder"
import { Card } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { h3 } from "../styles"
interface FolderDescriptionProps {
    folder: FolderDetailType
}

export function FilesTable ({ folder }: FolderDescriptionProps ) {
    return (
        <div className="w-full">
                <h2 className={`${h3} mb-4`}>Registros</h2>
            <Card className="w-full">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex gap-4">
                                <p>Fecha</p>
                                <p>Nombre del Registro</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex gap-4">
                                <p>2025-03-04</p>
                                <p>Vacunas</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex gap-4">
                                <p>2025-03-04</p>
                                <p>Vacunas</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                             <TableCell className="flex gap-4">
                                <p>2025-03-04</p>
                                <p>Vacunas</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                             <TableCell className="flex gap-4">
                                <p>2025-03-04</p>
                                <p>Vacunas</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    
                </Table>
            </Card>
        </div>
    )
}
