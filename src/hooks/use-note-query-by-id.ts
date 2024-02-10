import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { getNoteById } from "@/queries/get-note-by-id";

function useNoteByIdQuery(noteId: string) {
    const client = useSupabase();
    const queryKey = ['note', noteId];
   
    const queryFn = async () => {
      return getNoteById(client, noteId).then(
        (result) => result.data
      );
    };
   
    return useQuery({ queryKey, queryFn });
  }
   
  export default useNoteByIdQuery;