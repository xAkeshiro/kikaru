"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up",
    description:
      "Create your free account in seconds. Pick a unique username and claim your kikaru.net page.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Customize",
    description:
      "Choose a theme, add your links, upload your portfolio pieces, and make it truly yours.",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share",
    description:
      "Share your page everywhere. One link for your entire creative presence.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-kikaru-accent">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-kikaru-text sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mx-auto max-w-lg text-kikaru-text-secondary">
            Three simple steps to launch your creative presence online.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-16 hidden h-px md:block">
            <div className="mx-auto flex w-2/3 items-center justify-between">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px w-full origin-left bg-gradient-to-r from-kikaru-accent/60 to-kikaru-accent/20"
              />
            </div>
          </div>

          {/* Connecting dots (mobile only) */}
          <div className="absolute bottom-0 left-8 top-0 flex flex-col items-center md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full w-px origin-top bg-gradient-to-b from-kikaru-accent/60 via-kikaru-accent/30 to-transparent"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                className="relative flex gap-6 md:flex-col md:items-center md:text-center"
              >
                {/* Icon circle */}
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-kikaru-border bg-kikaru-surface">
                  <Icon size={24} className="text-kikaru-accent" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-kikaru-accent font-mono text-[10px] font-bold text-white">
                    {step.number.replace("0", "")}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-kikaru-text">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-kikaru-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
