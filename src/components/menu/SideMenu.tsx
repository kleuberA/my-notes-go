"use client"

import useGetNotes from "@/hooks/use-get-notes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideMenu() {

    const { data: note, isLoading, isError } = useGetNotes();
    const [pathNote, setPathNote] = useState<string>();
    // console.log(note)
    const pathname = usePathname();
    useEffect(() => {
        setPathNote(pathname.split('/').pop());
    }, [])

    return (
        <section className="h-full w-64 border-r border-r-border">
            <div className="border-b h-16 flex justify-center items-center border-b-border">
                <h1>List Notes</h1>
            </div>
            <div className="flex flex-col gap-3 p-3">
                {note?.map((note) => (
                    <Link href={`/note/${note.id}`} key={note.id} className={`${pathNote === note.id ? 'bg-primary hover:bg-primary/75' : 'bg-border hover:bg-border/75'} cursor-pointer transition-all duration-300 rounded-sm border border-border p-2`}>
                        <span className="text-sm text-accent-foreground">Title</span>
                        <p className="uppercase text-xs font-bold">{note.titulo}</p>
                        <div className="flex flex-col text-xs">
                            <span className="text-accent-foreground">Create At:{" "}</span>
                            <div className="flex flex-row text-accent-foreground text-xs">
                                <span className="">
                                    {`${note.created_at.split("T")[0]} as`}
                                </span>
                                <span>
                                    {`${note.created_at.split("T")[1].split(".")[0]}`}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}