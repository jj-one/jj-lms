'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth-context';
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const { logout, refreshUser } = useAuth();

  return <Button onClick={async () => {
        await logout();
        toast.success('Logged out successfully! Redirecting to login page...');
        await refreshUser(); // optional
        router.push('/login'); // or use window.location.href = '/login'
      }} variant="destructive">Logout</Button>;
}

