"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";
import { LoginResponse } from "@/types/api";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginData {
    email: string;
    password: string;
}

export default function Page(): React.ReactElement {
    const router = useRouter();
    const { toast } = useToast();

    function loginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        const data: LoginData = {
            email: email as string,
            password: password as string,
        };

        api.post("/auth/login", data)
            .then((response: AxiosResponse<LoginResponse>) => {
                if (response.status == 200) {
                    const token = response.data.data.token;
                    localStorage.setItem("auth-token", token);
                    router.push("/karyawan");
                }
            })
            .catch((error: AxiosError) => {
                if (error.status === 401)
                    toast({
                        title: "Uh oh! Seems like your credentials is wrong.",
                        description:
                            "Try Again with another email and password.",
                    });
            });
    }

    return (
        <div className="flex min-h-screen overflow-hidden">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">
                                Login
                            </CardTitle>
                            <CardDescription className="text-center">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={loginHandler}
                                className="grid gap-6"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="hidden w-0 flex-1 lg:block bg-primary"></div>
        </div>
    );
}
