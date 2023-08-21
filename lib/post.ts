import { compileMDX } from "next-mdx-remote/rsc";
import Mdx, { Question, Answer, Code } from "@/components/Mdx";
import { createClient } from "@supabase/supabase-js";

// supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { persistSession: false },
    }
);

export async function getPost(slug: string) {
    const res = await fetch(`https://raw.githubusercontent.com/AI-Daily-Sh/data/main/posts/${slug}.mdx`, {
    headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        },
    });
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

export async function getPosts() {
    // fetch posts from supabase
    const { data, error } = await supabase.from('posts').select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `).order('created_at', { ascending: false });
        
  
    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }
    
    // return posts
    return {
        posts: data,
    };
}

export async function getLatestPosts(limit?: number){
    const { data, error } = await supabase.from('posts').select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `).limit(limit ?? 3).order('created_at', { ascending: false });

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }
    
    // return posts
    return {
        posts: data,
    };
}

export async function getFeaturedPosts(limit?: number){
    const { data, error } = await supabase.from('posts').select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `);

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }

    const shuffledPosts = shuffleArray(data);

    // If a limit is provided, take a subset of the shuffled posts
    const featuredPosts = limit ? shuffledPosts.slice(0, limit) : shuffledPosts;

    // return shuffled and limited posts
    return {
        posts: featuredPosts,
    };
}

export async function getPostsByTag(tagSlug: string) {
    // fetch posts from supabase
    const { data, error } = await supabase.from('posts').select(`
        id,
        title,
        slug,
        excerpt,
        created_at,
        tags ( id, name, slug )
    `);

    // if error, return error
    if (error) {
        return {
            error,
        };
    }

    // if no data, return empty array
    if (!data) {
        return {
            posts: [],
        };
    }

    const posts = data.filter((post) => {
        return post.tags.some((tag) => tag.slug === tagSlug);
    });

    // return posts
    return {
        posts,
    };
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }