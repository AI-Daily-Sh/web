import { updatePostViewCount } from "@/lib/api/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const { slug } = body; 

    if (!slug) {
        return NextResponse.error();
    }
    
    const data = await updatePostViewCount(slug);

    return NextResponse.json(data);
}