import { InsertNotesType } from "@/types/insert-notes-type";
import { TypedSupabaseClient } from "@/utils/supabase";

export function InsertNote(
    client: TypedSupabaseClient,
    note: InsertNotesType
) {
    console.log(note);
    return client
        .from('notes')
        .insert({
                titulo: note.name,
                text: "",
            }) 
        .throwOnError()
}