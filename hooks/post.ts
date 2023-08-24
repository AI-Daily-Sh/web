import fetcher from "@/lib/app/fetcher";
import useSWR from 'swr'

export function usePosts() {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR("/api/posts", fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}

export function useLatestPosts(limit?: number) {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/posts/latest?limit=${limit}`, fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}

export function useFeaturedPosts(limit?: number) {    
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/posts/featured?limit=${limit}`, fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}

export function usePostsByTag(tagSlug: string) {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/posts/tag/${tagSlug}`, fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}
