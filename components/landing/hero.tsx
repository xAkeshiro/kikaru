"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated grid background */}
      <div className="kikaru-grid-bg" />

      {/* Gradient orbs */}
      <div className="kikaru-orb left-1/4 top-1/4 h-96 w-96 bg-violet-600 animate-pulse-soft" />
      <div className="kikaru-orb right-1/4 bottom-1/4 h-80 w-80 bg-purple-700 animate-pulse-soft [animation-delay:2s]" />
      <div className="kikaru-orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 animate-pulse-soft [animation-delay:4s]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-kikaru-border bg-kikaru-surface/50 px-4 py-1.5 font-mono text-xs text-kikaru-accent">
            For creators, by creators
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-kikaru-text sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Create Stunning{" "}
          <span className="kikaru-gradient-text">Creative Portfolios</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-kikaru-text-secondary sm:text-lg"
        >
          A Smart Creative Platform for All Creators. Build beautiful portfolio
          pages and link showcases that truly represent your art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/signup"
            className="kikaru-btn-primary w-full rounded-xl px-8 py-3.5 text-base font-semibold sm:w-auto"
          >
            Create Your Page
          </Link>
          <a
            href="#examples"
            className="kikaru-btn-secondary w-full rounded-xl px-8 py-3.5 text-base font-semibold sm:w-auto"
          >
            See Examples
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
