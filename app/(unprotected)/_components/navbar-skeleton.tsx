import { Skeleton } from "@/components/ui/skeleton";

export function UnprotectedNavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b  bg-gray-300">
      <div className="container min-h-16 flex items-center mx-auto py-4 md:py-6 lg:py-8">
        {/* Logo + Title */}
        <div className="flex items-center space-x-2 mr-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Navigation links and right-side buttons */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          {/* Nav links */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Right-side controls (theme toggle + login buttons / user info) */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-full" /> {/* theme toggle placeholder */}
            <Skeleton className="h-9 w-20 rounded-md" /> {/* login or user */}
            <Skeleton className="h-9 w-24 rounded-md" /> {/* sign-up or dropdown */}
          </div>
        </nav>
      </div>
    </header>
  );
}
