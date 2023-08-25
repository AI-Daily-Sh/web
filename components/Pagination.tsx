"use client";
import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Pagination({ meta }: { meta: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            {meta?.isPrev && (
                <div className="-mt-px flex w-0 flex-1">
                    <Link
                        href={
                            pathname +
                            "?" +
                            createQueryString("page", meta?.prevPage)
                        }
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Previous
                    </Link>
                </div>
            )}
            {meta?.isNext && (
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <Link
                        href={
                            pathname +
                            "?" +
                            createQueryString("page", meta?.nextPage)
                        }
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                        Next
                        <svg
                            className="ml-3 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
