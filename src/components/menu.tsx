"use client"
import useSupabase from "@/hooks/use-supabase";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";

export default function Menu() {

    const supabase = useSupabase();
    const [userAuth, setUserAuth] = useState<boolean>();

    async function verifyAuth() {
        const { data } = await supabase.auth.getSession();

        if (data.session?.user) {
            setUserAuth(true);
        } else {
            setUserAuth(false);
        }
    }

    verifyAuth();

    return (
        <nav className="w-full h-16 border-b border-b-border">
            <div className="w-[90dvw]  flex items-center flex-row justify-between mx-auto h-full">
                <div>
                    <Logo />
                </div>
                <div className="flex flex-row gap-3">
                    <ModeToggle />
                    {userAuth ? (
                        <div>
                            <Link href="/notes">
                                <Button className="w-24">
                                    Notes
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/signin">
                                <Button className="w-24">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="secondary">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}