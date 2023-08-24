import { createClient } from "@supabase/supabase-js";

// supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: { persistSession: false },
    }
);

export default supabase;