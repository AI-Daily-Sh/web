import { getPostsByTag } from "@/lib/api/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const limit = req.nextUrl.searchParams.get("limit");
    const page = req.nextUrl.searchParams.get("page");    

    const { data, error } = await getPostsByTag(params.slug, limit ?? "", page ?? "");

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}
