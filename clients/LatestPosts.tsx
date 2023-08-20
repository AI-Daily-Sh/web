import { getLatestPosts } from "@/lib/post";
import { randomTag } from "@/utils/tags";
import Link from "next/link";

export default async function LatestPosts() {
    const { posts } = await getLatestPosts();

    return (
        <div className="bg-white py-8 sm:py-12">
            <div className="container">
                <div className="mx-auto max-w-2xl lg:mx-0 pb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Recent Blog Posts
                    </h2>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-8 lg:max-w-none lg:grid-cols-3">
                    {posts?.length != 0 && posts?.map((post: any) => (
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
                                {post?.tags?.length != 0 &&
                                    <Link
                                    href={"/tags/" + randomTag(post.tags).slug}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-green-600 hover:bg-gray-100"
                                >
                                    {randomTag(post.tags).name}
                                </Link>}
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <Link href={"/posts/" + post.slug}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
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
