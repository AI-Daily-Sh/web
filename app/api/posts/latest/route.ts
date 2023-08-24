import { getLatestPosts } from "@/lib/api/db/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const limit = req.nextUrl.searchParams.get("limit");
    const {data, error} = await getLatestPosts(limit ?? "");

    if (error) {
        return NextResponse.error();
    }

    return NextResponse.json(data);
}
