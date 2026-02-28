"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface MockLink {
  label: string;
  color: string;
}

interface MockCreator {
  name: string;
  handle: string;
  theme: string;
  bgClass: string;
  accentClass: string;
  textClass: string;
  cardBgClass: string;
  borderClass: string;
  links: MockLink[];
}

const mockCreators: MockCreator[] = [
  {
    name: "Luna Nightshade",
    handle: "@lunacreates",
    theme: "Midnight",
    bgClass: "bg-[#0f0e1a]",
    accentClass: "text-blue-400",
    textClass: "text-slate-200",
    cardBgClass: "bg-[#1a1830]",
    borderClass: "border-blue-500/20",
    links: [
      { label: "Portfolio", color: "bg-blue-600/80" },
      { label: "Commission Info", color: "bg-blue-700/60" },
      { label: "Art Store", color: "bg-indigo-600/60" },
      { label: "Twitter", color: "bg-blue-500/40" },
    ],
  },
  {
    name: "Sakura Tanaka",
    handle: "@sakuradraws",
    theme: "Sakura",
    bgClass: "bg-[#1a0f14]",
    accentClass: "text-pink-400",
    textClass: "text-pink-100",
    cardBgClass: "bg-[#241520]",
    borderClass: "border-pink-500/20",
    links: [
      { label: "Gallery", color: "bg-pink-600/70" },
      { label: "YouTube Channel", color: "bg-pink-700/50" },
      { label: "Patreon", color: "bg-rose-600/50" },
      { label: "Instagram", color: "bg-pink-500/40" },
    ],
  },
  {
    name: "Neon Drift",
    handle: "@neondrift",
    theme: "Neon",
    bgClass: "bg-[#0a0a0f]",
    accentClass: "text-green-400",
    textClass: "text-green-100",
    cardBgClass: "bg-[#0f1a14]",
    borderClass: "border-green-500/20",
    links: [
      { label: "Beats & Music", color: "bg-green-600/60" },
      { label: "Visual Art", color: "bg-emerald-600/50" },
      { label: "Merch Store", color: "bg-teal-600/50" },
      { label: "SoundCloud", color: "bg-green-500/40" },
    ],
  },
];

export default function Examples() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="examples" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-kikaru-accent">
            Examples
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-kikaru-text sm:text-4xl">
            See what creators are building
          </h2>
          <p className="mx-auto max-w-lg text-kikaru-text-secondary">
            Beautiful, unique pages that reflect each creator's style and personality.
          </p>
        </motion.div>

        {/* Mock browser frames */}
        <div className="grid gap-8 md:grid-cols-3">
          {mockCreators.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              {/* Browser frame */}
              <div className="overflow-hidden rounded-xl border border-kikaru-border bg-kikaru-surface">
                {/* Browser toolbar */}
                <div className="flex items-center gap-2 border-b border-kikaru-border px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 rounded-md bg-kikaru-bg/50 px-3 py-1 text-center">
                    <span className="font-mono text-[10px] text-kikaru-text-secondary">
                      kikaru.net/{creator.handle.replace("@", "")}
                    </span>
                  </div>
                </div>

                {/* Page content mock */}
                <div className={`${creator.bgClass} p-6`}>
                  {/* Avatar placeholder */}
                  <div className="mb-4 flex flex-col items-center">
                    <div
                      className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 ${creator.borderClass} ${creator.cardBgClass}`}
                    >
                      <span className={`text-lg font-bold ${creator.accentClass}`}>
                        {creator.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className={`text-sm font-semibold ${creator.textClass}`}>
                      {creator.name}
                    </h4>
                    <p className={`text-xs opacity-60 ${creator.textClass}`}>
                      {creator.handle}
                    </p>
                  </div>

                  {/* Mock links */}
                  <div className="space-y-2">
                    {creator.links.map((link) => (
                      <div
                        key={link.label}
                        className={`flex items-center justify-between rounded-lg border ${creator.borderClass} ${link.color} px-4 py-2.5`}
                      >
                        <span className={`text-xs font-medium ${creator.textClass}`}>
                          {link.label}
                        </span>
                        <ExternalLink size={12} className={`opacity-40 ${creator.textClass}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme label */}
              <div className="mt-3 text-center">
                <span className="font-mono text-xs text-kikaru-text-secondary">
                  {creator.theme} Theme
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
