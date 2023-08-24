import { getPosts } from "@/lib/api/db/post";
import { createPost } from "@/lib/api/services/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const {data, error} = await getPosts();

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (process.env.API_SECRET !== secret) {
        return NextResponse.error();
    }
    const body = await req.json();
    const { slug } = body; 
    
    const matters = await createPost(slug);

    return NextResponse.json({
        matters,
    });
}
