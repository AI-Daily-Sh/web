import AllPosts from "@/clients/AllPosts";
import { Suspense } from "react";

export default function Posts(){
    return (
        <div className="bg-white">
            <Suspense fallback={<div>Loading...</div>}>
                <AllPosts />
            </Suspense>
        </div>
    )
}