import {
  Table,
  TableBody,
  TableCell,
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

import { 
    Select, 
    SelectItem, 
    SelectTrigger, 
    SelectValue,
    SelectContent
} from "../ui/select"

import { 
    PlusCircledIcon, 
    CaretLeftIcon, 
    CaretRightIcon, 
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons"
import { Link, useNavigate } from "react-router-dom"
import { PaginationInterface } from "@/types/folder"

interface FoldersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  pagination: PaginationInterface,
  pageSizeOptions: number[]
  setPagination: (updateOrValue: {pageIndex: number, pageSize: number}) => TData[]
}
 
export function  FoldersTable<TData, TValue>({ 
        columns, 
        data, 
        pagination,
        pageSizeOptions = [1, 5, 10, 20, 30, 40, 50],
        setPagination,
    }: 
        FoldersTableProps<TData, TValue>
    ) {
    const navigate = useNavigate()

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: {
                pageIndex: pagination.page,
                pageSize: pagination.pageSize,
            },
        },
        rowCount: pagination.totalItems,
        manualPagination: true,
        pageCount: pagination.totalPages,
        // onPaginationChange: setPagination({}),
        getCoreRowModel: getCoreRowModel(),
    })
    
    const onPageSizeChange = (value: string) => {
        
        const newPageSize = Number(value)

        return newPageSize
        /* table.setPageSize(newPageSize)

        setPagination({
            pageIndex: 0,
            pageSize: newPageSize
        }) */
    }

    return (
        <div className="w-full">
            {/* Table Toolbar */}
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
                
                {/* Left tools */}
                <div className="flex gap-4">
                    {/* Table Filter and Sort Tools */}
                    {/* <div className="flex gap-2 items-center" >
                        <SortAscIcon />
                        <SortDescIcon />
                    </div> */}

                    {/* Create New Item Button */}
                    <Button asChild>
                        <Link to="/folder/create">
                            <PlusCircledIcon /> Crear Nuevo Legajo
                        </Link>
                    </Button>

                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow 
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="flex flex-row gap-4 hover:cursor-pointer"
                                    onClick={ () => {
                                        navigate(`/folder/${row.original._id}`)
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell 
                                            key={cell.id}
                                            className={cell.column.columnDef.meta?.className}
                                        >
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </TableCell>
                                    ))} 
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Table Footer Tools */}
            <div className="flex justify-between">

                {/* Table Totals */}
                <div className="flex items-center justify-center font-medium text-sm">
                    Legajos totales: {table.getRowModel().rows?.length}
                </div>

                {/* Table Pagination */}
                <div className="flex items-center justify-between space-x-6 py-4">
                    {/* Page size */}
                    <div className="flex flex-col-reverse items center gap-4 sm:flex-row sm:gap-6 lg-gap-8">
                        <div className="flex items-center space-x-2">
                            <p className="whitepsace-nowrap font-medium text-sm">Legajos por página</p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={ value => table.setPageSize(Number(value))}
                            >
                                <SelectTrigger className="w-[4.5rem] [&[data-size]]:h-8">{/* className="h-8 w-[4.5rem] [&[data-size]]:h-8" */}
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {pageSizeOptions.map(
                                        (pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                {pageSize}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Amount of Pages */}
                    <div className="flex items-center justify-center font-medium text-sm">
                        Página {table.getState().pagination.pageIndex} de {" "} {table.getPageCount()}
                    </div>

                    {/* Pagination Arrows */}
                    <div className="flex items-center space-x-2">
                        <Button 
                            aria-label="Ir a la primer página"
                            variant="outline"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <DoubleArrowLeftIcon />
                        </Button>
                        <Button 
                            aria-label="Ir a página anterior"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <CaretLeftIcon />
                        </Button>
                        <Button 
                            aria-label="Ir a página siguiente"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <CaretRightIcon />
                        </Button>
                            <Button 
                            aria-label="Ir a la última página"
                            variant="outline"
                            size="icon"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <DoubleArrowRightIcon />    
                        </Button>
                        <div >
                            <p>table.getPageCount: {table.getPageCount()}</p>
                            <p>table.getCanNextPage: {String(table.getCanNextPage())}</p>
                            <p>table.getCanPreviousPage: {String(table.getCanPreviousPage())}</p>
                        </div>
                    </div>
                </div>

            </div>
        {/*     <div className="w-1/3">
                <p>This is data: </p>
                <p>{JSON.stringify(data)}</p>
            </div> */}

            
        </div>
    )
}

