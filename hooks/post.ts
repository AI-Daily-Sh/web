import fetcher from "@/lib/app/fetcher";
import useSWR from 'swr'

export function usePosts(limit?: string, page?: string) {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/posts?limit=${limit}&page=${page}`, fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}

export function useLatestPosts(limit?: string) {
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

export function useFeaturedPosts(limit?: string) {    
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

export function usePostsByTag(tagSlug: string, limit?: string, page?: string) {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/posts/tag/${tagSlug}?limit=${limit}&page=${page}`, fetcher);

    return {
        posts,
        isLoading,
        error,
    };
}
