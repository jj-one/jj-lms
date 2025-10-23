import { UnprotectedNavbar } from "./_components/navbar";

export default function UnprotectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <UnprotectedNavbar />
        <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
}