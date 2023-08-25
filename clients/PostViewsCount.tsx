"use client";
import { incrementPostViewCount } from "@/lib/app/posts";
import { useEffect, useState } from "react";

export default function PostViewsCount({ slug }: { slug: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        (async () => {
            const { data } = await incrementPostViewCount(slug);
            setCount(data[0].view_count);
        })();
    }, []);

    return (
        <div>
            {count} {count === 1 ? "view" : "views"}
        </div>
    );
}
