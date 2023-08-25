import supabase from "@/supabase/init";
import { shuffleArray } from "@/utils/array";
import { getCurrentFormattedDate } from "@/utils/date";

export async function getPosts() {
    const { data, error } = await supabase
        .from("posts")
        .select(
            `
            id,
            title,
            slug,
            excerpt,
            created_at,
            tags ( id, name, slug )
            `
        )
        .order("created_at", { ascending: false });

    if (error) {
        return {
            error,
        };
    }

    if (!data) {
        return {
            data: [],
        };
    }

    return {
        data,
    };
}

export async function getPostsByTag(tagSlug: string) {
    // fetch posts from supabase
    const { data, error } = await supabase
        .from("tags")
        .select(
            `
        id,
        name,
        slug,
        created_at,
        posts ( id, title, slug, excerpt, created_at)
        `
        )
        .eq("slug", tagSlug);

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            data: [],
        };
    }

    // return posts
    return {
        data: data[0].posts.sort((a: any, b: any) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        }),
    };
}

export async function getLatestPosts(limit?: string) {
    const { data, error } = await supabase
        .from("posts")
        .select(
            `
            id,
            title,
            slug,
            excerpt,
            created_at,
            tags ( id, name, slug )
            `
        )
        .limit(Number(limit) ?? 3)
        .order("created_at", { ascending: false });

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            data: [],
        };
    }

    // return posts
    return {
        data,
    };
}

export async function getFeaturedPosts(limit?: string) {
    const { data, error } = await supabase.from("posts").select(
        `
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
        `
    );

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            data: [],
        };
    }

    const shuffledPosts = shuffleArray(data);

    // If a limit is provided, take a subset of the shuffled posts
    const featuredPosts = limit
        ? shuffledPosts.slice(0, Number(limit))
        : shuffledPosts;

    // return shuffled and limited posts
    return {
        data: featuredPosts,
    };
}

export async function insertPost(title: string, slug: string, excerpt: string) {
    const date = getCurrentFormattedDate();
    const { data: existingPost } = await supabase
        .from("posts")
        .select()
        .eq("slug", date + "-" + slug);

    if (existingPost && existingPost.length > 0) {
        return;
    }

    const { data, error } = await supabase
        .from("posts")
        .insert([
            {
                title,
                slug: date + "-" + slug,
                excerpt,
            },
        ])
        .select();

    if (error) {
        console.error("Error:", error);
        return;
    }
    return data[0].id;
}

export async function insertPostTags(postId: string, tagIds: string[]) {
    const { data, error } = await supabase
        .from("post_tags")
        .insert(tagIds.map((id: string) => ({ post_id: postId, tag_id: id })))
        .select();

    if (error) {
        console.error("Error:", error);
        return;
    }
}
