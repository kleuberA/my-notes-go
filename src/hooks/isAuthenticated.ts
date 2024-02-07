import { useRouter } from "next/navigation";
import useSupabase from "./use-supabase";

async function isAuthenticated() {
    const supabase = useSupabase();
    const router = useRouter();

    const { data } = await supabase.auth.getSession();

    if (!data?.session) {
        router.push('/');
    }

    if (data.session?.user) {
        router.push('/notes');
    }
}

export default isAuthenticated;