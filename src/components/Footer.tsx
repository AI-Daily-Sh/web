export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="mt-8 md:order-1 md:mt-0 w-full">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} AI Daily. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
