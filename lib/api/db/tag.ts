import supabase from "@/supabase/init";

export async function insertTag(name: string, slug: string) {
    // insert tag if not exists or return id
    const { data, error } = await supabase
        .from("tags")
        .select()
        .eq("slug", slug);

    if (error) {
        console.error("Error:", error);
        return;
    }

    if (data.length > 0) {
        return data[0].id;
    } else {
        const { data, error } = await supabase
            .from("tags")
            .insert([
                {
                    name,
                    slug,
                },
            ])
            .select();

        if (error) {
            console.error("Error:", error);
            return;
        } else {
            return data[0].id;
        }
    }
}