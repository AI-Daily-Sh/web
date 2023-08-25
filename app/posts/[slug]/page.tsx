import { getPost } from "@/lib/app/posts";
import Link from "next/link";
import { Suspense } from "react";
import PostViewsCount from "@/clients/PostViewsCount";

export default async function Post({ params }: { params: { slug: string } }) {
    const { frontmatter, content } = await getPost(params.slug);

    return (
        <div className="bg-white">
            <Suspense fallback={<LoadingSkeleton />}>
                <div className="mx-auto w-full p-4 max-w-2xl lg:px-0">
                    <div className="mb-1 border-b border-gray-100 pt-3 sm:mb-2 sm:pb-3 sm:pt-8">
                        <h1 className="text-gray-70 text-3xl font-bold leading-tight sm:text-4xl">
                            {frontmatter.title}
                        </h1>
                        <div className="flex gap-x-6 pt-3 text-sm text-gray-400 sm:pt-4">
                            <div>
                                {frontmatter.date}
                            </div>
                            <PostViewsCount slug={params.slug} />
                        </div>
                        <div className="my-3 text-sm text-green-600 sm:my-4 flex gap-2 flex-wrap">
                            {frontmatter.tags.map((tag: any) => (
                                <Link
                                    key={tag}
                                    href={
                                        "/tags/" +
                                        tag.toLowerCase().replace(" ", "-")
                                    }
                                    className="relative z-10 shrink-0 rounded-full bg-gray-50 px-3 py-1.5 font-medium hover:bg-gray-100"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>{content}</div>
                </div>
            </Suspense>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="mx-auto w-full p-4 max-w-2xl lg:px-0">
            <div className="mb-1 border-b border-gray-100 pt-3 sm:mb-2 sm:pb-3 sm:pt-8 animate-pulse">
                <div className="bg-gray-200 h-8 sm:h-10 rounded-full w-4/6"></div>
                <div className="mt-6 h-3 w-16 bg-gray-200 sm:mt-8 rounded-full"></div>
                <div className="my-3 h-4 flex gap-2 flex-wrap sm:my-4">
                    {Array(3)
                        .fill(0)
                        .map((tag: any) => (
                            <div
                                key={tag}
                                className="relative z-10 shrink-0 rounded-full bg-gray-300 w-16 h-4"
                            ></div>
                        ))}
                </div>
            </div>
            <div className="animate-pulse max-w-2xl py-4 mx-auto space-y-4">
                <div className="relative pt-3">
                    <div className="absolute -left-12 flex items-center justify-center w-10 h-10 text-xl font-bold bg-green-100 rounded-full shrink-0">
                        H
                    </div>
                    <div className="p-2 bg-green-100 rounded-md h-10"></div>
                </div>
                <div className="relative">
                    <div className="absolute -left-12 flex items-center justify-center w-10 h-10 text-xl font-bold rounded-full shrink-0 bg-neutral-100">
                        AI
                    </div>
                    <div className="p-4 rounded-md bg-neutral-100 h-screen"></div>
                </div>
            </div>
        </div>
    );
}
