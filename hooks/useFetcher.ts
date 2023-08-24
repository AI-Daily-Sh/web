import { useState, useEffect } from "react";

interface DataFetchingResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetcher<T>(url: string): DataFetchingResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_WEB_URL + url);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetcher;
