import {
  Table,
  TableBody,
  TableCell,
  /* TableHead,
  TableHeader, */
  TableRow,
} from "@/components/ui/table"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { PlusCircledIcon } from "@radix-ui/react-icons"
// import { LineChart } from "lucide-react"
import { Link } from "react-router-dom"

interface FoldersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}
 
export function FoldersDataTable<TData, TValue>({ columns, data,}: FoldersDataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            {/* Table Filter and Sort Tools */}
            <div className="flex items-center py-4 gap-4 justify-between">
                {/* Search Box */}
                <Input 
                    placeholder="Buscar legajos..."
                    value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => 
                        table.getColumn("fullName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* Create New Item Button */}
                <Button asChild>
                    <Link to="/folder/create">
                        <PlusCircledIcon /> Crear Nuevo Legajo
                    </Link>
                </Button>
            </div>
            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    {/* 
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                     */}
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="flex flex-row gap-4"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell 
                                            key={cell.id}
                                            className={cell.column.columnDef.meta?.className}
                                            // ${cell.column.columnDef.size}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Table Footer Tools */}
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* Table Totals */}
                {/* Table Pagination */}
            </div>
        </div>
    )
}