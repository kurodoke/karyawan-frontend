"use client";

import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "./ui/sidebar";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const menu = [
    { title: "Dashboard", url: "/karyawan", icon: Home, sub: {} },
    {
        title: "Karyawan",
        url: "/karyawan/list",
        icon: User,
        sub: {
            title: "Add Data",
        },
    },
];

export default function KaryawanSideBar({
    setDrawerOpen,
}: {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
    const router = useRouter();

    function handleLogout(event: React.MouseEvent) {
        event.preventDefault();

        localStorage.removeItem("auth-token");

        router.push("/login");
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-primary text-md md:text-lg mt-4 mb-1 font-semibold">
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="font-medium text-secondary-foreground">
                            {menu.map((item, index) => {
                                return (
                                    <React.Fragment key={item.title + "-frag"}>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url}>
                                                    <item.icon className="mr-2" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        {index === 1 && (
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem
                                                    key={item.sub.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            href={"#"}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setDrawerOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <span className="ms-2">
                                                                {item.sub.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button onClick={handleLogout} className="m-2">
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
