import { insertPost, insertPostTags } from "@/lib/api/db/post";
import { insertTag } from "@/lib/api/db/tag";
import matter from "gray-matter";

export async function createPost(slug: string) {
    const fileName = slug.split(".")[0];
    const res = await fetch(
        `${process.env.DATA_URL}/${fileName}.mdx`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        }
    );
    const markdown = await res.text();
    const frontmatter = matter(markdown).data;
    const postId = await insertPost(
        frontmatter.title,
        frontmatter.slug,
        frontmatter.excerpt
    );
    if (!postId) {
        return;
    }
    const tags = frontmatter.tags;
    const tagIds: string[] = [];
    await Promise.all(
        tags?.map(async (tag: string) => {
            const id = await insertTag(
                tag,
                tag.toLowerCase().replace(" ", "-")
            );
            tagIds.push(id);
        })
    );
    if (tagIds.length > 0) await insertPostTags(postId, tagIds);
    return frontmatter;
}
