"use client";
import { usePostsByTag } from "@/hooks/post";
import Link from "next/link";

export default function PostsByTag({ slug }: { slug: string }) {
    const { posts, loading, error } = usePostsByTag(slug);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="px-4">
            <div className="mx-auto max-w-2xl">
                <div className="mx-auto max-w-2xl lg:mx-0 pb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        From the {slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </h2>
                </div>
                <div className="space-y-8 border-t border-gray-200 pt-8">
                    {loading && <div>Loading...</div>}
                    {Array.isArray(posts) &&
                        posts?.length != 0 &&
                        posts?.map((post: any) => (
                            <article
                                key={post.id}
                                className="flex max-w-xl flex-col items-start justify-between"
                            >
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time
                                        dateTime={post.datetime}
                                        className="text-gray-500"
                                    >
                                        {post.created_at.split("T")[0]}
                                    </time>
                                    {post?.tags?.length != 0 && (
                                        <Link
                                            href={"/tags/" + slug}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-green-600 hover:bg-gray-100"
                                        >
                                            {slug.charAt(0).toUpperCase() +
                                                slug.slice(1).replace("-", " ")}
                                        </Link>
                                    )}
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <Link href={"/posts/" + post.slug}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </div>
    );
}
