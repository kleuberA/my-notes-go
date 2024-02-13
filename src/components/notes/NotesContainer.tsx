"use client"
import { TrashIcon } from "@radix-ui/react-icons";
import useGetNotes from "@/hooks/use-get-notes";
import useSupabase from "@/hooks/use-supabase";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NotesContainer() {

    const supabase = useSupabase();
    const { data: note, isLoading, isError } = useGetNotes();
    const router = useRouter();
    // console.log(note)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const handleClickDeleteNote = async (id: string) => {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)
            .single();
        if (!error) {
            toast.success('Note deleted successfully!',
                {
                    style: {
                        borderRadius: '3px',
                        background: '#333',
                        color: '#fff',
                    }
                })
            router.push('/notes');
        }
    }

    return (
        <section className="w-full h-full">
            <div className="flex w-full h-full flex-col justify-center items-center">
                {note?.length === 0 && (
                    <div className="w-96 mx-auto border border-primary border-dashed text-center p-3 h-48 rounded-sm flex flex-col justify-center items-center">
                        <h1 className="text-xl text-accent-foreground">You don't have any notes!</h1>
                        <span className="text-sm text-primary">Create your note now.</span>
                    </div>
                )}
                {note?.length !== 0 && (
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full h-16 flex items-center justify-center relative border-b border-b-border">
                            <div className="absolute w-full h-full bg-secondary -z-10 blur-sm" />
                            <h1 className="text-accent-foreground text-xl tracking-widest font-mono">Notes</h1>
                        </div>
                        <div className="p-4 flex flex-row gap-5 flex-wrap">
                            {note?.map((note) => (
                                <Link href={`/note/${note.id}`} key={note.id} className="h-24 group hover:bg-border relative transition-all duration-300 cursor-pointer w-64 flex items-center justify-between border border-border p-2 rounded-sm">
                                    <div
                                        className="absolute z-10 hidden group-hover:flex transition-all duration-300 justify-center items-center rounded-sm w-5 h-5 bg-red-500/35 top-2"
                                        onClick={() => handleClickDeleteNote(note.id)}
                                    >
                                        <TrashIcon />
                                    </div>
                                    <div className="flex items-center">
                                        <h1 className="text-accent-foreground text-sm font-semibold whitespace-normal w-32 text-ellipsis overflow-hidden">{note.titulo}</h1>
                                    </div>
                                    <div className="flex items-center text-primary text-xs flex-col justify-start">
                                        <span className="text-accent-foreground">Criado em:</span>
                                        <span className="">
                                            {`${note.created_at.split("T")[0]} as`}
                                        </span>
                                        <span>
                                            {`${note.created_at.split("T")[1].split(".")[0]}`}
                                        </span>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}