import PostsByTag from "@/clients/PostsByTag";

export default async function Tags({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <PostsByTag slug={params.slug} limit={searchParams?.limit} page={searchParams?.page} />
        </div>
    );
}
