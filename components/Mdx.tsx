export default function Mdx({ children }: { children: React.ReactNode }) {
    return <div className="max-w-2xl py-4 mx-auto space-y-4">{children}</div>;
}

export function Question({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative pt-3">
            <div className="absolute -left-12 flex items-center justify-center w-10 h-10 text-xl font-bold bg-green-100 rounded-full shrink-0">
                H
            </div>
            <div className="p-2 bg-green-100 rounded-md">{children}</div>
        </div>
    );
}

export function Answer({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="absolute -left-12 flex items-center justify-center w-10 h-10 text-xl font-bold rounded-full shrink-0 bg-neutral-200">
                AI
            </div>
            <div className="p-4 rounded-md bg-neutral-200">
                {children}
            </div>
        </div>
    );
}
