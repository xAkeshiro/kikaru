"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your creative page.",
    features: [
      "1 page",
      "kikaru.net subdomain",
      "Basic themes",
      "Basic customization",
      "Community access",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$5",
    yearlyPrice: "$48",
    description: "Everything you need for a professional creative presence.",
    features: [
      "Unlimited pages",
      "Custom domain support",
      "Premium themes",
      "Analytics dashboard",
      "Priority support",
      'Remove "Made with Kikaru" badge',
    ],
    cta: "Go Pro",
    href: "/signup?plan=pro",
    highlighted: true,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-kikaru-accent">
            Pricing
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-kikaru-text sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-lg text-kikaru-text-secondary">
            Start free. Upgrade when you are ready to go pro.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <span
            className={cn(
              "text-sm transition-colors",
              !isYearly ? "text-kikaru-text" : "text-kikaru-text-secondary"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn(
              "relative h-7 w-12 rounded-full border transition-colors",
              isYearly
                ? "border-kikaru-accent bg-kikaru-accent/20"
                : "border-kikaru-border bg-kikaru-surface"
            )}
            aria-label="Toggle yearly billing"
          >
            <div
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                isYearly ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm transition-colors",
              isYearly ? "text-kikaru-text" : "text-kikaru-text-secondary"
            )}
          >
            Yearly
          </span>
          {isYearly && (
            <span className="rounded-full bg-kikaru-accent/10 px-2.5 py-0.5 font-mono text-xs text-kikaru-accent">
              Save 20%
            </span>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={cn(
                "relative rounded-2xl border p-8",
                tier.highlighted
                  ? "border-kikaru-accent/50 bg-kikaru-surface shadow-lg shadow-kikaru-accent/5"
                  : "border-kikaru-border bg-kikaru-surface"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-kikaru-accent px-3 py-1 font-mono text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-1 text-lg font-semibold text-kikaru-text">
                  {tier.name}
                </h3>
                <p className="mb-4 text-sm text-kikaru-text-secondary">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-kikaru-text">
                    {tier.highlighted
                      ? isYearly
                        ? tier.yearlyPrice
                        : tier.monthlyPrice
                      : tier.price}
                  </span>
                  <span className="text-sm text-kikaru-text-secondary">
                    /{" "}
                    {tier.highlighted
                      ? isYearly
                        ? "year"
                        : "month"
                      : tier.period}
                  </span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className={cn(
                        "mt-0.5 flex-shrink-0",
                        tier.highlighted
                          ? "text-kikaru-accent"
                          : "text-kikaru-text-secondary"
                      )}
                    />
                    <span className="text-sm text-kikaru-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={cn(
                  "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all",
                  tier.highlighted
                    ? "kikaru-btn-primary"
                    : "kikaru-btn-secondary"
                )}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
