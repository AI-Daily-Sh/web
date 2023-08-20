"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
];
export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-white border-b">
            <>
                <div className="container">
                    <div className="flex h-16 justify-between">
                        <div className="flex px-2 lg:px-0">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/" className="text-green-500 text-3xl font-bold italic">AI_</Link>
                            </div>
                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                            pathname === item.href
                                                ? "border-green-500 text-gray-900"
                                                : "border-transparent hover:border-gray-300"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end gap-x-2">
                            <div className="w-full max-w-lg lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-8 justify-center md:hidden">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-gray-500 hover:text-gray-700 inline-flex items-center px-3 pt-1 pb-4 border-b-2 text-sm font-medium ${
                                    pathname === item.href
                                        ? "border-green-500 text-gray-900"
                                        : "border-transparent hover:border-gray-300"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        </nav>
    );
}
