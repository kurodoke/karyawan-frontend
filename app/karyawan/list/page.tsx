"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useApiRequest } from "@/hooks/use-api";
import { KaryawanResponse } from "@/types/api";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Page(): React.ReactElement {
    const { responseData, error, loading } = useApiRequest<KaryawanResponse>({
        url: "/karyawan",
        method: "get",
    });

    // const data = responseData?.data.map((item, index) => {
    //     item.tanggal_masuk = new Date(item.tanggal_masuk).toDateString();
    //     return item;
    // });

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-4xl text-primary font-semibold">
                    Table List Karyawan
                </h3>
                <p className="text-md text-muted-foreground">
                    Shows all the data Karyawan within table
                </p>
            </div>

            {responseData && (
                <div>
                    <DataTable columns={columns} data={responseData?.data} />
                </div>
            )}
        </div>
    );
}
