import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="bg-destructive/30 rounded-full p-4 mx-auto">
                        <ShieldX className="size-16 text-destructive" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">
                        Access Denied
                    </CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground max-w-xs mx-auto">
                        You do not have the necessary permissions to access this page and/or file requested.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Link href="/" className={buttonVariants({ className: "w-full rounded-none" })}>
                        <ArrowLeft className="size-4 mr-2" /> 
                        Back to Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}