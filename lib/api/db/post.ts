import supabase from "@/supabase/init";
import { getCurrentFormattedDate } from "@/utils/date";
import pagination, { getEndLimit, getStartLimit } from "@/utils/pagination";

export async function getPosts(limit?: string, page?: string) {
    const startLimit = getStartLimit(Number(page), Number(limit));
    const endLimit = getEndLimit(Number(page), Number(limit));

    const { count: totalCount } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true });

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
        .range(startLimit, endLimit)
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
        data: pagination(
            data,
            Number(page),
            Number(limit),
            totalCount ?? 0
        ),
    };
}

export async function getPostsByTag(
    tagSlug: string,
    limit?: string,
    page?: string
) {
    const startLimit = getStartLimit(Number(page), Number(limit));
    const endLimit = getEndLimit(Number(page), Number(limit));    

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

    const sortedData = data[0].posts.slice(startLimit, endLimit + 1).sort((a: any, b: any) => {
        return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    });

    // return posts
    return {
        data: pagination(
            sortedData,
            Number(page),
            Number(limit),
            data[0].posts.length ?? 0
        ),
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
    const { data, error } = await supabase
        .from("post_views")
        .select(
            `
        post_id,
        view_count,
        posts ( id, title, slug, excerpt, created_at, tags ( id, name, slug ) )
        `
        )
        .order("view_count", { ascending: false })
        .limit(Number(limit) ?? 4);

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

    // return shuffled and limited posts
    return {
        data: data.map((post: any) => post.posts).flat(),
    };
}

export async function updatePostViewCount(slug: string) {
    const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select()
        .eq("slug", slug);

    if (postsError) {
        return {
            error: postsError,
        };
    }

    if (!posts || posts.length === 0) {
        return {
            error: "No posts found",
        };
    }

    const post = posts[0];

    const { data: postViews, error: postViewsError } = await supabase
        .from("post_views")
        .select()
        .eq("post_id", post.id);

    if (postViewsError) {
        return {
            error: postViewsError,
        };
    }

    if (!postViews || postViews.length === 0) {
        const { data: newPostView, error: newPostViewError } = await supabase
            .from("post_views")
            .insert([
                {
                    post_id: post.id,
                    view_count: 1,
                },
            ])
            .select();

        if (newPostViewError) {
            return {
                error: newPostViewError,
            };
        }

        return {
            data: newPostView,
        };
    }

    const { data: updatedPostView, error: updatedPostViewError } =
        await supabase
            .from("post_views")
            .update({ view_count: postViews[0].view_count + 1 })
            .eq("post_id", post.id)
            .select();

    if (updatedPostViewError) {
        return {
            error: updatedPostViewError,
        };
    }

    return {
        data: updatedPostView,
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
