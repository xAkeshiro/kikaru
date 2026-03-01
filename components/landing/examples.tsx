"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface MockLink {
  label: string;
}

interface MockCreator {
  name: string;
  handle: string;
  theme: string;
  links: MockLink[];
}

const mockCreators: MockCreator[] = [
  {
    name: "Luna Nightshade",
    handle: "@lunacreates",
    theme: "Midnight",
    links: [
      { label: "Portfolio" },
      { label: "Commission Info" },
      { label: "Art Store" },
      { label: "Twitter" },
    ],
  },
  {
    name: "Sakura Tanaka",
    handle: "@sakuradraws",
    theme: "Sakura",
    links: [
      { label: "Gallery" },
      { label: "YouTube Channel" },
      { label: "Patreon" },
      { label: "Instagram" },
    ],
  },
  {
    name: "Neon Drift",
    handle: "@neondrift",
    theme: "Neon",
    links: [
      { label: "Beats & Music" },
      { label: "Visual Art" },
      { label: "Merch Store" },
      { label: "SoundCloud" },
    ],
  },
];

export default function Examples() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="examples" className="kikaru-section-dark relative px-4 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="kikaru-subheading mb-4 inline-block text-xs tracking-[0.3em] text-white/60">
            Examples
          </span>
          <h2 className="kikaru-heading mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
            SEE WHAT CREATORS ARE BUILDING
          </h2>
          <p className="mx-auto max-w-lg text-white/60">
            Beautiful, unique pages that reflect each creator&apos;s style and personality.
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
              <div className="overflow-hidden border border-white/10 bg-black">
                {/* Browser toolbar */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 border border-white/20" />
                    <div className="h-2 w-2 border border-white/20" />
                    <div className="h-2 w-2 border border-white/20" />
                  </div>
                  <div className="flex-1 border border-white/10 px-3 py-1 text-center">
                    <span className="font-sans text-[10px] text-white/40">
                      kikaru.net/{creator.handle.replace("@", "")}
                    </span>
                  </div>
                </div>

                {/* Page content mock */}
                <div className="bg-black p-6">
                  {/* Avatar placeholder */}
                  <div className="mb-4 flex flex-col items-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center border border-white/20">
                      <span className="font-heading text-lg font-bold text-white">
                        {creator.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="font-heading text-sm uppercase tracking-[0.1em] text-white">
                      {creator.name}
                    </h4>
                    <p className="text-xs text-white/40">
                      {creator.handle}
                    </p>
                  </div>

                  {/* Mock links */}
                  <div className="space-y-2">
                    {creator.links.map((link) => (
                      <div
                        key={link.label}
                        className="flex items-center justify-between border border-white/15 px-4 py-2.5 transition-colors hover:border-white/30"
                      >
                        <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                          {link.label}
                        </span>
                        <ExternalLink size={12} className="text-white/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme label */}
              <div className="mt-3 text-center">
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-white/40">
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
