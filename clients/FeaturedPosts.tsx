"use client";
import { useFeaturedPosts } from "@/hooks/post";
import Link from "next/link";

export default function FeaturedPosts() {
    const { posts, loading, error } = useFeaturedPosts(4);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-white py-8 sm:py-12">
            <div className="container">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {loading && <div>Loading...</div>}
                    {Array.isArray(posts) &&
                        posts?.length != 0 &&
                        posts?.map((post) => (
                            <div key={post.id}>
                                <time
                                    dateTime={post.created_at}
                                    className="flex items-center text-sm font-semibold leading-6 text-green-600"
                                >
                                    <svg
                                        viewBox="0 0 4 4"
                                        className="mr-4 h-1 w-1 flex-none"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            cx={2}
                                            cy={2}
                                            r={2}
                                            fill="currentColor"
                                        />
                                    </svg>
                                    {post.created_at.split("T")[0]}
                                    <div
                                        className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                        aria-hidden="true"
                                    />
                                </time>
                                <Link href={"/posts/" + post.slug}>
                                    <p className="mt-2 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                        {post.title}
                                    </p>
                                    <p className="mt-1 text-base leading-7 text-gray-600">
                                        {post.excerpt}
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
