"use client"
import useNoteByIdQuery from "@/hooks/use-note-query-by-id";
import Tiptap from "../tiptap/TipTap";

interface NoteComponentProps {
    id: string;
}
export default function NoteComponent(props: NoteComponentProps) {
    const { data: note, isLoading, isError } = useNoteByIdQuery(props.id);
    console.log(note);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <section className="w-full h-full flex flex-col p-4">
            <h1 className="text-xl tracking-widest font-semibold text-accent-foreground">Title: <span className="text-primary">{note?.titulo}</span> </h1>
            <Tiptap idNote={note?.id as string} tituloNote={note?.titulo as string} text={note?.text as string} />
        </section>
    )
}