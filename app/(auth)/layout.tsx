import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black px-4">
      {/* Subtle grid */}
      <div className="kikaru-grid-bg pointer-events-none" />

      {/* Branding */}
      <div className="relative z-10 mb-10">
        <Link href="/" className="block text-center">
          <Logo size="lg" />
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
