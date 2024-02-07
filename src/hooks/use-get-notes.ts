import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/queries/get-notes";
import useSupabase from "./use-supabase";

function useGetNotes() {
    const client = useSupabase();
    const queryKey = ['notes'];
   
    const queryFn = async () => {
      return getNotes(client).then(
        (result: { data: any; }) => result.data
      );
    };
   
    return useQuery({ queryKey, queryFn });
  }
   
  export default useGetNotes;