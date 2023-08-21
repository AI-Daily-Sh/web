import HeroSection from "@/components/HeroSection";
import FeaturedPosts from "@/clients/FeaturedPosts";
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
