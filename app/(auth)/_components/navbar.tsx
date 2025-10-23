"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeModeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface AuthNavbarProps {
    name: string;
    href: string
}

const navigation: AuthNavbarProps[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
];

export function AuthNavbar() {
    const pathname = usePathname();

    const isLoginPage = pathname === '/login';
    const isSignUpPage = pathname === '/sign-up';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
        <div className="container min-h-16 flex items-center mx-auto py-4 md:py-6 lg:py-8">
            <Link href="/" className="flex items-center space-x-2 mr-4">
                <Image src={Logo} alt="Logo" className="size-9" />
                <span className="font-bold">JJ-LMS</span>
            </Link>

            <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                <div className="flex items-center space-x-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-muted-foreground/80"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                
                <div className="flex items-center space-x-4">
                    <ThemeModeToggle />
                    {!isLoginPage && <Link href="/login" className={buttonVariants({ variant: 'outline' })}>Login</Link>}
                    {!isSignUpPage && <Link href="/sign-up" className={buttonVariants()}>Sign Up</Link>}
                </div>
            </nav>  
        </div>
    </header>
  );
}