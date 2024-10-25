"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useApiRequest } from "@/hooks/use-api";
import { api } from "@/lib/axios";
import { KaryawanResponse } from "@/types/api";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page(): React.ReactElement {
    const router = useRouter();

    const { responseData, error, loading } = useApiRequest<KaryawanResponse>({
        url: "/karyawan",
        method: "get",
    });

    console.log(responseData);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-4xl text-primary font-semibold">
                    Dashboard
                </h3>
                <p className="text-md text-muted-foreground">
                    Just a simple Dashboard Page.
                </p>
            </div>

            <div>
                {!loading && responseData && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Karyawan</CardTitle>
                            <CardDescription>
                                Shows the total of all karyawan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span
                                className="text-4xl"
                                style={{ fontFamily: "var(--font-geist-mono)" }}
                            >
                                {responseData.data.length}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">
                                People
                            </span>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
