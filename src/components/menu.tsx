import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import Link from "next/link";
import Logo from "./logo";

export default function Menu() {
    return (
        <nav className="w-full h-16 border-b border-b-border">
            <div className="w-[90dvw]  flex items-center flex-row justify-between mx-auto h-full">
                <div>
                    <Logo />
                </div>
                <div className="flex flex-row gap-3">
                    <ModeToggle />
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
                </div>
            </div>
        </nav>
    )
}