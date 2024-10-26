"use client";

import KaryawanDrawer from "@/components/karyawan-drawer";
import KaryawanSideBar from "@/components/karyawan-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    return (
        <SidebarProvider>
            <KaryawanDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
            <KaryawanSideBar setDrawerOpen={setIsDrawerOpen} />
            <main className="p-4 lg:p-6">
                <SidebarTrigger className="mb-4 lg:mb-6" />
                {children}
            </main>
        </SidebarProvider>
    );
}
