import supabase from "@/supabase/init";

export async function usePosts() {
    // fetch posts from supabase
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

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }

    // return posts
    return {
        posts: data,
    };
}

export async function useLatestPosts(limit?: number) {
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
        .limit(limit ?? 3)
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
            posts: [],
        };
    }

    // return posts
    return {
        posts: data,
    };
}

export async function useFeaturedPosts(limit?: number) {
    const { data, error } = await supabase.from("posts").select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `);

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }

    const shuffledPosts = shuffleArray(data);

    // If a limit is provided, take a subset of the shuffled posts
    const featuredPosts = limit ? shuffledPosts.slice(0, limit) : shuffledPosts;

    // return shuffled and limited posts
    return {
        posts: featuredPosts,
    };
}

export async function usePostsByTag(tagSlug: string) {
    // fetch posts from supabase
    const { data, error } = await supabase.from("posts").select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `);

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }

    const posts = data.filter((post) => {
        return post.tags.some((tag) => tag.slug === tagSlug);
    });

    // return posts
    return {
        posts,
    };
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
