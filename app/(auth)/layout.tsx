import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-kikaru-bg px-4">
      {/* Background grid */}
      <div className="kikaru-grid-bg pointer-events-none" />

      {/* Gradient orb */}
      <div className="kikaru-orb w-[400px] h-[400px] -top-40 left-1/2 -translate-x-1/2 bg-kikaru-accent fixed" />

      {/* Branding */}
      <div className="relative z-10 mb-8">
        <Link href="/" className="block text-center">
          <span className="font-mono text-3xl font-bold kikaru-gradient-text">
            kikaru
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
