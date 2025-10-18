// components/general/navbar-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <nav className="py-5 flex items-center justify-between bg-gray-300">
      <div className="flex items-center gap-12">
        {/* Logo Skeleton */}
        <Skeleton className="h-8 w-36" />

        {/* Menu Links Skeleton */}
        <div className="hidden sm:flex items-center gap-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      {/* Auth Buttons Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
    </nav>
  );
}