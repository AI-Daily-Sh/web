import { compileMDX } from "next-mdx-remote/rsc";
import Mdx, { Question, Answer, Code } from "@/components/Mdx";

export async function getPost(slug: string) {
    const res = await fetch(
        `${process.env.DATA_URL}/${slug}.mdx`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );
    const markdown = await res.text();
    const { frontmatter, content } = await compileMDX<{
        title: string;
        date: string;
        tags: string[];
    }>({
        source: markdown,
        components: {
            Mdx,
            MdxQuestion: Question,
            MdxAnswer: Answer,
            MdxCode: Code,
        },
        options: {
            parseFrontmatter: true,
            // mdxOptions: {
            //     rehypePlugins: [
            //         rehypeHighlight,
            //         rehypeSlug,
            //         [rehypeAutolinkHeadings, {
            //             behavior: 'wrap'
            //         }],
            //     ],
            // },
        },
    });

    return {
        frontmatter,
        content,
    };
}

export async function incrementPostViewCount(slug: string){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/posts/${slug}/views`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
        }
    );

    const data = await res.json();

    return data;
}