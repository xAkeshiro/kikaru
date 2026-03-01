import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "PROJECT", href: "#" },
  { label: "HOME", href: "/" },
  { label: "FEATURES", href: "#features" },
  { label: "PRICING", href: "#pricing" },
  { label: "EXAMPLES", href: "#examples" },
];

export default function Footer() {
  return (
    <footer className="kikaru-section-dark px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Top section: Logo left, nav centered */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo - bottom left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo size="md" />
            </Link>
          </div>

          {/* Nav links with dash prefixes - centered */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-heading text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
              >
                &ndash; {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer for balance on desktop */}
          <div className="hidden w-24 md:block" />
        </div>

        {/* Legal text and copyright - centered */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="mb-2 text-xs text-white/30">
            {"\u682A\u5F0F\u4F1A\u793E"} Kikaru Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} KIKARU &mdash; A Smart Creative Platform for All Creators
          </p>
        </div>
      </div>
    </footer>
  );
}
