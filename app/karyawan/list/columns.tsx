"use client";

import { Button } from "@/components/ui/button";
import { Karyawan } from "@/types/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Karyawan>[] = [
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
    },
    {
        accessorKey: "jabatan",
        header: () => <div className="text-right">Jabatan</div>,
        cell({ row }) {
            return <div className="text-right">{row.getValue("jabatan")}</div>;
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

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "tanggal_masuk",
        header: () => <div className="text">Tanggal Masuk</div>,
        cell(row) {
            const date = new Date(row.getValue() as string);

            const formatted = date.toISOString().split("T")[0];
            return <div className="text-right font-medium">{formatted}</div>;
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
                        <DropdownMenuItem onClick={() => {}}>
                            Edit Data
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="bg-primary focus:bg-primary focus:text-white text-white"
                            onClick={() => {}}
                        >
                            Delete Data
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
