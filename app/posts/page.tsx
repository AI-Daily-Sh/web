import AllPosts from "@/clients/AllPosts";

export default function Posts({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    return (
        <div className="bg-white">
            <AllPosts limit={searchParams?.limit} page={searchParams?.page} />
        </div>
    );
}
