import KaryawanSideBar from "@/components/karyawan-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <SidebarProvider>
            <KaryawanSideBar />
            <main className="p-4 lg:p-6">
                <SidebarTrigger className="mb-4 lg:mb-6" />
                {children}
            </main>
        </SidebarProvider>
    );
}
