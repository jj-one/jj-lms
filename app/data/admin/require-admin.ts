import "server-only";

import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export async function requireAdminUser() {
    
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/login');
    }

    if (user.role !== "admin") {
        return redirect('/not-admin');
    }

    return user;
}