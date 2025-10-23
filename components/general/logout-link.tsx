"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context"; // adjust import path

export function useLogoutAction() {
  const router = useRouter();
  const { logout, refreshUser } = useAuth();

  // Return a reusable async function
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully! Redirecting to login page...");
      await refreshUser(); // optional, clears context
      router.push("/login"); // navigate
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return handleLogout;
}
