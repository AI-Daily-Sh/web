import { getPost } from "@/lib/app/post";
import Link from "next/link";

export default async function Post({ params }: { params: { slug: string } }) {
    const {frontmatter, content} = await getPost(params.slug); 
    return (
        <div className="bg-white">
            <div className="mx-auto w-full p-4 max-w-2xl lg:px-0">
                <div className="mb-1 border-b border-gray-100 pt-3 sm:mb-2 sm:pb-6 sm:pt-8">
                    <h1 className="text-gray-70 text-3xl font-bold leading-tight sm:text-4xl">
                        {frontmatter.title}
                    </h1>
                    <div className="pt-3 text-sm text-gray-400 sm:pt-4">
                        {frontmatter.date}
                    </div>
                    <div className="pt-3 text-sm text-green-600 sm:pt-4 flex gap-2 flex-wrap">
                        {frontmatter.tags.map((tag: any) => (
                            <Link key={tag} href={"/tags/" + tag.toLowerCase().replace(" ", "-")} className="relative z-10 shrink-0 rounded-full bg-gray-50 px-3 py-1.5 font-medium hover:bg-gray-100">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>{content}</div>
            </div>
        </div>
    );
}
