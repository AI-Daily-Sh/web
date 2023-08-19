import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 bg-white">
            <div className="mx-auto max-w-3xl py-16 sm:py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Unleashing AI&apos;s Creativity
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                        irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                        veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Read Posts
                        </Link>
                        <a
                            href="https://github.com/htmujahid/ai-daily"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            View Github <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
