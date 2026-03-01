"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "FEATURES", href: "#features" },
  { label: "PRICING", href: "#pricing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "kikaru-glass" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-20 items-center justify-between">
          {/* Language Switcher - far left */}
          <div className="hidden items-center gap-1 md:flex">
            <span className="font-heading text-xs uppercase tracking-[0.15em] text-white">EN</span>
            <span className="text-xs text-white/40">|</span>
            <span className="font-heading text-xs uppercase tracking-[0.15em] text-white/60">{"\uD55C\uAD6D\uC5B4"}</span>
          </div>

          {/* Logo - centered */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav + login - far right */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-xs tracking-[0.15em] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className="border border-white px-5 py-2 font-heading text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 text-white/60 transition-colors hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="kikaru-glass overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {/* Language switcher mobile */}
              <div className="mb-4 flex items-center gap-2 px-3">
                <span className="font-heading text-xs uppercase tracking-[0.15em] text-white">EN</span>
                <span className="text-xs text-white/40">|</span>
                <span className="font-heading text-xs uppercase tracking-[0.15em] text-white/60">{"\uD55C\uAD6D\uC5B4"}</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 font-heading text-sm uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 border-t border-white/10 pt-6">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block border border-white px-4 py-3 text-center font-heading text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
