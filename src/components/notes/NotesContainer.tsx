"use client"
import useGetNotes from "@/hooks/use-get-notes";

export default function NotesContainer() {

    const { data: organization, isLoading, isError } = useGetNotes();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(organization);

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <section className="w-full h-full">
            <div className="flex w-full h-full flex-col justify-center items-center">
                {organization && (
                    <div className="w-96 mx-auto border border-primary border-dashed text-center p-3 h-48 rounded-sm flex flex-col justify-center items-center">
                        <h1 className="text-xl text-accent-foreground">You don't have any notes!</h1>
                        <span className="text-sm text-primary">Create your note now.</span>
                    </div>
                )}
            </div>
        </section>
    )
}