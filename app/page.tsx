import FeaturedPosts from "@/clients/FeaturedPosts";
import HeroSection from "@/clients/HeroSection";
import LatestPosts from "@/clients/LatestPosts";

export default function Home() {
    return (
        <main className="">
            <HeroSection />
            <FeaturedPosts />
            <LatestPosts />
        </main>
    );
}
