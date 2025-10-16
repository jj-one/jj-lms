import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode}) {
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant: "outline",
                className: "absolute top-4 left-4 md:top-8 md:left-8"
            })}>
                <ArrowLeft /> Home
            </Link>
            <div className="max-w-sm w-full mx-auto flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medimm">
                    <Image src={Logo} alt="JJ-LMS Logo" width={32} height={32} className="rounded-md"/>
                    JJ-LMS
                </Link>
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
    )
}