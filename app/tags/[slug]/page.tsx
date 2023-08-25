import PostsByTag from "@/clients/PostsByTag";

export default async function Tags({ params }: { params: { slug: string } }) {
    return (
        <div className="bg-white py-24 sm:py-32">
            <PostsByTag slug={params.slug} />
        </div>
    );
}
