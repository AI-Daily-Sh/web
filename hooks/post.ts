import useFetcher from "./useFetcher";

export function usePosts() {
    const {
        data: posts,
        loading,
        error,
    } = useFetcher("/api/posts");

    return {
        posts,
        loading,
        error,
    };
}

export function useLatestPosts(limit?: number) {
    const {
        data: posts,
        loading,
        error,
    } = useFetcher(`/api/posts/latest?limit=${limit}`);

    return {
        posts,
        loading,
        error,
    };
}

export function useFeaturedPosts(limit?: number) {    
    const {
        data: posts,
        loading,
        error,
    } = useFetcher(`/api/posts/featured?limit=${limit}`);

    return {
        posts,
        loading,
        error,
    };
}

export function usePostsByTag(tagSlug: string) {
    const {
        data: posts,
        loading,
        error,
    } = useFetcher(`/api/posts/tag/${tagSlug}`);

    return {
        posts,
        loading,
        error,
    };
}
