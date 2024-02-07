import { TypedSupabaseClient } from "@/utils/supabase";

export function getNotes(
    client: TypedSupabaseClient, 
) {
    return client
        .from('notes')
        .select()
        .throwOnError()
}