// const posts = [
//     {
//         id: 1,
//         title: "Boost your conversion rate",
//         href: "#",
//         description:
//             "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
//         date: "Mar 16, 2020",
//         datetime: "2020-03-16",
//         category: { title: "Marketing", href: "#" },
//         author: {
//             name: "Michael Foster",
//             role: "Co-Founder / CTO",
//             href: "#",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//     },
//     {
//         id: 2,
//         title: "Boost your conversion rate",
//         href: "#",
//         description:
//             "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
//         date: "Mar 16, 2020",
//         datetime: "2020-03-16",
//         category: { title: "Marketing", href: "#" },
//         author: {
//             name: "Michael Foster",
//             role: "Co-Founder / CTO",
//             href: "#",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//     },
//     {
//         id: 3,
//         title: "Boost your conversion rate",
//         href: "#",
//         description:
//             "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
//         date: "Mar 16, 2020",
//         datetime: "2020-03-16",
//         category: { title: "Marketing", href: "#" },
//         author: {
//             name: "Michael Foster",
//             role: "Co-Founder / CTO",
//             href: "#",
//             imageUrl:
//                 "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//         },
//     },
// ];

import { getPosts } from "@/lib/post";
import { randomTag } from "@/utils/tags";
import Link from "next/link";

export default async function AllPosts() {
    const { posts } = await getPosts();
    
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="">
                <div className="mx-auto max-w-2xl">
                    <div className="mx-auto max-w-2xl lg:mx-0 pb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            From the Posts
                        </h2>
                    </div>
                    <div className="space-y-8 border-t border-gray-200 pt-8">
                        {posts?.length && posts.map((post: any) => (
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
                                    {post?.tags?.length != 0 && <Link
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
                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
