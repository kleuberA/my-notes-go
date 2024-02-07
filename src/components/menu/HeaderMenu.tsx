"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import useSupabase from "@/hooks/use-supabase";
import { ModeToggle } from "../toggle-theme";
import { Button } from "../ui/button";
import { useState } from "react";

export default function HeaderMenu() {

    const supabase = useSupabase();
    const [nameUser, setNameUser] = useState<string>("");

    async function getUser() {
        const { data } = await supabase.auth.getSession();
        setNameUser(data.session?.user.user_metadata.name.split(' ')[0].charAt(0).toUpperCase());
    }

    getUser();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    }

    return (
        <section className="w-full h-16 border-b border-b-primary">
            <div className="h-full flex justify-between w-[90%] items-center mx-auto">
                <div>
                    <Button variant="outline" className="flex flex-row gap-2 items-center"> <PlusIcon /> Create Note </Button>
                </div>
                <div className="flex flex-row h-full items-center gap-3">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button size="icon" className="hover:bg-background border hover:border-primary hover:text-primary transition-all duration-300">
                                {nameUser}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-primary">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    <span className="flex flex-row gap-2 items-center"> <GearIcon /> Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer flex flex-row gap-2 items-center" onClick={handleLogout}> <ExitIcon width={16} height={16} /> Logout</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </section>
    )
}