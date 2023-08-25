"use client";
import { useFeaturedPosts } from "@/hooks/post";
import Link from "next/link";

export default function FeaturedPosts() {
    const { posts, isLoading, error } = useFeaturedPosts("4");

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-white py-8 sm:py-12">
            <div className="container">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {isLoading && <LoadingSkeleton />}
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

function LoadingSkeleton() {
    return Array(4)
        .fill(0)
        .map((_, i) => (
            <div key={i} className="flex flex-col max-w-xl">
                <div className="flex items-center animate-pulse w-full space-x-4 mb-6 text-green-600">
                    <svg
                        viewBox="0 0 4 4"
                        className="h-1 w-1 flex-none"
                        aria-hidden="true"
                    >
                        <circle cx={2} cy={2} r={2} fill="currentColor" />
                    </svg>
                    <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                    <div
                        className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                        aria-hidden="true"
                    />
                </div>
                <div role="status" className="animate-pulse w-full">
                    <div className="h-5 bg-gray-200 rounded-full w-4/6 mb-5"></div>
                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ));
}
