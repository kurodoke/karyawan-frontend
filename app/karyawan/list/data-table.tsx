"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { format, set } from "date-fns";
import { KaryawanAlertDialog } from "@/components/karyawan-alert";
import { SingleKaryawanResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { useApiRequest } from "@/hooks/use-api";

interface DataTableProps<TData, TValue> {
    data: TData[];
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIdKaryawan: React.Dispatch<React.SetStateAction<number>>;
}

export function DataTable<TData, TValue>({
    data,
    setIsDrawerOpen,
    setIdKaryawan,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const [idDelete, setIdDelete] = React.useState(0);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);

    const router = useRouter();

    const { responseData, loading } = useApiRequest<SingleKaryawanResponse>({
        method: "delete",
        url: isDelete ? `/karyawan/${idDelete}` : "",
        data: data,
        fullfiledCallback(res) {
            if (res.status == 200 && res.config.method == "delete") {
                setIsDelete(false);
                router.refresh();
                history.go(0);
            }
        },
    });

    const columns: ColumnDef<TData>[] = [
        {
            accessorKey: "id",
            header: () => null,
            cell: () => null,
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            accessorKey: "nama",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Karyawan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell({ row }) {
                return <div className="capitalize">{row.getValue("nama")}</div>;
            },
        },
        {
            accessorKey: "jabatan",
            header: () => <div className="text-right">Jabatan</div>,
            cell({ row }) {
                return (
                    <div className="text-right font-medium capitalize">
                        {row.getValue("jabatan")}
                    </div>
                );
            },
        },
        {
            accessorKey: "gaji",
            header: () => <div className="text-right">Gaji</div>,
            cell({ row }) {
                const amount = parseFloat(row.getValue("gaji"));

                const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(amount);

                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        {
            accessorKey: "tanggal_masuk",
            header: () => <div className="text-right">Tanggal Masuk</div>,
            cell(row) {
                const date = new Date(row.getValue() as string);

                const formatted = format(date, "PPP");
                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsDrawerOpen(true);
                                    setIdKaryawan(row.getValue("id"));
                                }}
                            >
                                Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="bg-primary focus:bg-primary focus:text-white text-white"
                                onClick={() => {
                                    setIsDeleteDialogOpen(true);
                                    setIdDelete(row.getValue("id"));
                                }}
                            >
                                Delete Data
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <>
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Search Karyawan..."
                        value={
                            (table
                                .getColumn("nama")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) => {
                            table
                                .getColumn("nama")
                                ?.setFilterValue(event.target.value);
                        }}
                        className="max-w-xs lg:max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
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
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <KaryawanAlertDialog
                open={isDeleteDialogOpen}
                setOpen={setIsDeleteDialogOpen}
                setConfirm={setIsDelete}
            />
        </>
    );
}
