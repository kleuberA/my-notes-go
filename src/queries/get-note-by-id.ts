import { TypedSupabaseClient } from "@/utils/supabase";

export function getNoteById(
    client: TypedSupabaseClient, 
    noteId: string
  ) {
    return client
      .from('notes')
      .select(`
        id,
        titulo,
        text
      `)
      .eq('id', noteId)
      .throwOnError()
      .single();
  }