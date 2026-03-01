"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "SIGN UP",
    description:
      "Create your free account in seconds. Pick a unique username and claim your kikaru.net page.",
  },
  {
    number: "02",
    title: "CUSTOMIZE",
    description:
      "Choose a theme, add your links, upload your portfolio pieces, and make it truly yours.",
  },
  {
    number: "03",
    title: "SHARE",
    description:
      "Share your page everywhere. One link for your entire creative presence.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="kikaru-section-light relative px-4 py-24 sm:py-36">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="kikaru-subheading mb-4 inline-block text-xs tracking-[0.3em] text-black/40">
            How It Works
          </span>
          <h2 className="kikaru-heading mb-4 text-3xl text-black sm:text-4xl lg:text-5xl">
            UP AND RUNNING IN MINUTES
          </h2>
          <p className="mx-auto max-w-lg text-black/60">
            Three simple steps to launch your creative presence online.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-16 md:grid-cols-3 md:gap-12">
          {/* Connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px md:block">
            <div className="mx-auto w-2/3">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px w-full origin-left bg-black/20"
              />
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="mb-6">
                <span className="kikaru-heading text-4xl text-black/20">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="kikaru-subheading mb-3 text-sm text-black">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
