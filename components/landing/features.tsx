"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Link2, Paintbrush, BarChart3, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "BEAUTIFUL PORTFOLIOS",
    description: "Showcase your art in stunning, customizable portfolio layouts.",
  },
  {
    icon: Link2,
    title: "QUICK LINKS",
    description: "Share all your important links in one beautiful, branded page.",
  },
  {
    icon: Paintbrush,
    title: "CUSTOM THEMES",
    description: "Choose from curated themes designed for creators. Or build your own.",
  },
  {
    icon: BarChart3,
    title: "ANALYTICS",
    description: "Track your page views and link clicks. Know your audience.",
  },
  {
    icon: Globe,
    title: "CUSTOM DOMAINS",
    description: "Use your own domain for a fully professional presence.",
  },
  {
    icon: Users,
    title: "COMMUNITY",
    description: "Join a community of artists and creators building together.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="kikaru-section-dark relative px-4 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="kikaru-subheading mb-4 inline-block text-xs tracking-[0.3em] text-white/60">
            Features
          </span>
          <h2 className="kikaru-heading mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
            EVERYTHING YOU NEED
          </h2>
          <p className="mx-auto max-w-lg text-white/60">
            All the tools you need to build a powerful creative presence, in one place.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="kikaru-card group p-8"
              >
                <div className="mb-5">
                  <Icon size={22} className="text-white/80" strokeWidth={1.5} />
                </div>
                <h3 className="kikaru-subheading mb-3 text-sm text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
