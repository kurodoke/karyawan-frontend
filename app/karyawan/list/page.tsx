"use client";

import { useApiRequest } from "@/hooks/use-api";
import { KaryawanResponse } from "@/types/api";
import React from "react";
import { DataTable } from "./data-table";
import KaryawanDrawer from "@/components/karyawan-drawer";

export default function Page(): React.ReactElement {
    const { responseData, loading } = useApiRequest<KaryawanResponse>({
        url: "/karyawan",
        method: "get",
    });

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [idKaryawan, setIdKaryawan] = React.useState(0);

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
                    <KaryawanDrawer
                        open={isDrawerOpen}
                        setOpen={setIsDrawerOpen}
                        idKaryawan={idKaryawan}
                        isUpdate
                    />
                    <DataTable
                        data={responseData?.data}
                        setIsDrawerOpen={setIsDrawerOpen}
                        setIdKaryawan={setIdKaryawan}
                    />
                </div>
            )}
        </div>
    );
}
