"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Link2, Paintbrush, BarChart3, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Beautiful Portfolios",
    description: "Showcase your art in stunning, customizable portfolio layouts.",
  },
  {
    icon: Link2,
    title: "Quick Links",
    description: "Share all your important links in one beautiful, branded page.",
  },
  {
    icon: Paintbrush,
    title: "Custom Themes",
    description: "Choose from curated themes designed for creators. Or build your own.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track your page views and link clicks. Know your audience.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Use your own domain for a fully professional presence.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a community of artists and creators building together.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-kikaru-accent">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-kikaru-text sm:text-4xl">
            Everything you need to shine
          </h2>
          <p className="mx-auto max-w-lg text-kikaru-text-secondary">
            All the tools you need to build a powerful creative presence, in one place.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="kikaru-card group rounded-2xl p-6"
              >
                <div className="mb-4 inline-flex rounded-xl bg-kikaru-accent/10 p-3">
                  <Icon size={22} className="text-kikaru-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-kikaru-text">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-kikaru-text-secondary">
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
