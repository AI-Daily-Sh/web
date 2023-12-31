import { getPosts } from "@/lib/api/db/post";
import { createPost } from "@/lib/api/services/post.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const limit = req.nextUrl.searchParams.get("limit");
    const page = req.nextUrl.searchParams.get("page");
    
    const { data, error } = await getPosts(limit ?? "", page ?? "");

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");

    if (process.env.API_SECRET !== secret) {
        return NextResponse.json({
            error: "Access Forbidden",
        });
    }

    const body = await req.json();
    const { slug } = body;

    const matters = await createPost(slug);

    return NextResponse.json({
        data: matters,
    });
}
