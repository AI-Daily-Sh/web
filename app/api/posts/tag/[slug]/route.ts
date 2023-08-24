import { getPostsByTag } from "@/lib/api/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { data, error } = await getPostsByTag(params.slug);

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}
