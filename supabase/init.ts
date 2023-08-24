import { createClient } from "@supabase/supabase-js";

// supabase client
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
        auth: { persistSession: false },
    }
);

export default supabase;