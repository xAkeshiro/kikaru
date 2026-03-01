"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="kikaru-hero-texture relative flex min-h-screen items-center overflow-hidden px-4">
      {/* Content - left aligned */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-start gap-6">
        {/* Blue accent bar */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="kikaru-accent-bar hidden origin-top self-stretch md:block"
        />

        {/* Hero text block */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="kikaru-heading mb-6 text-5xl leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            A SMART
            <br />
            CREATIVE
            <br />
            PLATFORM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Build beautiful portfolio pages and link showcases that truly
            represent your art. For creators, by creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/signup"
              className="kikaru-btn-primary px-10 py-3"
            >
              Create Your Page
            </Link>
            <div className="flex items-center gap-1">
              <a
                href="#features"
                className="kikaru-btn-secondary px-10 py-3"
              >
                Learn More
              </a>
              <span className="kikaru-cursor-line" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#features" className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/60">
          <ChevronUp size={16} strokeWidth={1} />
          <span className="h-6 w-px bg-current" />
        </a>
      </motion.div>
    </section>
  );
}
