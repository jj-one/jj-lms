import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode}) {
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center">
            <div className="max-w-sm w-full mx-auto flex flex-col gap-6">
                { children }
            </div>
        </div>
    )
}