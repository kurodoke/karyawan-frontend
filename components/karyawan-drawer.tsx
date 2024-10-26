import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useApiRequest } from "@/hooks/use-api";
import { Karyawan } from "@/types/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SingleKaryawanResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { KaryawanDatePicker } from "./karyawan-datepicker";
import { useToast } from "@/hooks/use-toast";

interface KaryawanDrawerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    idKaryawan?: number;
    isUpdate?: boolean;
}

export default function KaryawanDrawer({
    open,
    setOpen,
    idKaryawan = 0,
    isUpdate = false,
}: KaryawanDrawerProps) {
    const [data, setData] = useState<object | null>(null);
    const [isSending, setIsSending] = useState(false);

    const [date, setDate] = useState<Date | undefined>();

    const router = useRouter();
    const { toast } = useToast();

    const { responseData, loading } = useApiRequest<SingleKaryawanResponse>({
        method: isUpdate ? (isSending && data ? "put" : "get") : "post",
        url: isUpdate ? `/karyawan/${idKaryawan}` : "/karyawan",
        data: data,
        fullfiledCallback(res) {
            if (
                (res.status == 200 && res.config.method == "put") ||
                res.config.method == "post"
            ) {
                setIsSending(false);
                router.refresh();
                history.go(0);
            }

            if (res.status == 200 && res.config.method == "get") {
                setDate(new Date(res.data.data.tanggal_masuk));
            }
        },
    });

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (!date) {
            toast({
                title: "Uh oh! Seems like your forgot to select a date.",
                description: "Try to fill all of the input.",
            });
            return;
        }
        const data = {
            id: idKaryawan,
            nama: formData.get("nama") as string,
            gaji: formData.get("gaji") as string,
            jabatan: formData.get("jabatan") as string,
            tanggal_masuk: date.toISOString() as string,
        };

        setIsSending(true);
        setData(data);
    }

    if (isUpdate) {
        if (!loading && responseData)
            return (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Edit Karyawan</DrawerTitle>
                            <DrawerDescription>
                                Make changes to your karyawan here. Click save
                                when you're done.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">
                            <form
                                className="grid grid-cols-6 md:grid-cols-12 items-start gap-4"
                                onSubmit={submitHandler}
                            >
                                <div className="col-span-6 grid gap-2">
                                    <Label htmlFor="nama">Nama</Label>
                                    <Input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        defaultValue={responseData.data.nama}
                                    />
                                </div>
                                <div className="col-span-6 grid gap-2">
                                    <Label htmlFor="gaji">Gaji</Label>
                                    <Input
                                        type="number"
                                        id="gaji"
                                        name="gaji"
                                        defaultValue={responseData.data.gaji}
                                    />
                                </div>
                                <div className="col-span-6 grid gap-2">
                                    <Label htmlFor="jabatan">Jabatan</Label>
                                    <Input
                                        type="text"
                                        id="jabatan"
                                        name="jabatan"
                                        defaultValue={responseData.data.jabatan}
                                    />
                                </div>
                                <div className="col-span-6 grid gap-2">
                                    <Label htmlFor="tanggal_masuk">
                                        Tanggal Masuk
                                    </Label>
                                    <KaryawanDatePicker
                                        date={
                                            date
                                                ? date
                                                : new Date(
                                                      responseData.data.tanggal_masuk
                                                  )
                                        }
                                        setDate={setDate}
                                    />
                                </div>
                                <Button
                                    className="col-span-6 md:col-span-12"
                                    type="submit"
                                >
                                    Save changes
                                </Button>
                            </form>
                        </div>
                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            );
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Create Karyawan</DrawerTitle>
                        <DrawerDescription>
                            Create your karyawan here. Click save when you're
                            done.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <form
                            className="grid grid-cols-6 md:grid-cols-12 items-start gap-4"
                            onSubmit={submitHandler}
                        >
                            <div className="col-span-6 grid gap-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    placeholder="Fufufafa..."
                                />
                            </div>
                            <div className="col-span-6 grid gap-2">
                                <Label htmlFor="gaji">Gaji</Label>
                                <Input
                                    type="number"
                                    id="gaji"
                                    name="gaji"
                                    placeholder="Rp.10xxxxx"
                                />
                            </div>
                            <div className="col-span-6 grid gap-2">
                                <Label htmlFor="jabatan">Jabatan</Label>
                                <Input
                                    type="text"
                                    id="jabatan"
                                    name="jabatan"
                                    placeholder="Pegawai"
                                />
                            </div>
                            <div className="col-span-6 grid gap-2">
                                <Label htmlFor="tanggal_masuk">
                                    Tanggal Masuk
                                </Label>
                                <KaryawanDatePicker
                                    date={date}
                                    setDate={setDate}
                                />
                            </div>
                            <Button
                                className="col-span-6 md:col-span-12"
                                type="submit"
                            >
                                Create
                            </Button>
                        </form>
                    </div>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
}
