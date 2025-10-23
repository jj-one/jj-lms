import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { AuthNavbar } from "./_components/navbar";

export default function AuthLayout({ children }: { children: ReactNode}) {
    return (
        <>
        <AuthNavbar />
        <div className="relative min-h-svh flex flex-col items-center justify-center">

            <div className="max-w-sm w-full mx-auto flex flex-col gap-6">
                { children }

                <div className="text-sm text-muted-foreground text-center">
                    By clicking Continue, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>
                    .   
                </div>
            </div>
        </div>
        </>
    )
}