"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "FREE",
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
    cta: "GET STARTED",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "PRO",
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
    cta: "GO PRO",
    href: "/signup?plan=pro",
    highlighted: true,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="kikaru-section-light relative px-4 py-24 sm:py-36">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="kikaru-subheading mb-4 inline-block text-xs tracking-[0.3em] text-black/40">
            Pricing
          </span>
          <h2 className="kikaru-heading mb-4 text-3xl text-black sm:text-4xl lg:text-5xl">
            SIMPLE, TRANSPARENT PRICING
          </h2>
          <p className="mx-auto max-w-lg text-black/60">
            Start free. Upgrade when you are ready to go pro.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 flex items-center justify-center gap-4"
        >
          <span
            className={cn(
              "font-heading text-xs uppercase tracking-[0.15em] transition-colors",
              !isYearly ? "text-black" : "text-black/40"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn(
              "relative h-7 w-12 border transition-colors",
              isYearly
                ? "border-black bg-black"
                : "border-black/30 bg-white"
            )}
            aria-label="Toggle yearly billing"
          >
            <div
              className={cn(
                "absolute top-0.5 h-5 w-5 transition-transform",
                isYearly ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
              )}
            />
          </button>
          <span
            className={cn(
              "font-heading text-xs uppercase tracking-[0.15em] transition-colors",
              isYearly ? "text-black" : "text-black/40"
            )}
          >
            Yearly
          </span>
          {isYearly && (
            <span className="border border-black px-2.5 py-0.5 font-heading text-[10px] uppercase tracking-[0.15em] text-black">
              Save 20%
            </span>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={cn(
                "relative border p-10",
                tier.highlighted
                  ? "border-black"
                  : "border-black/20"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#0000FF] px-3 py-1 font-heading text-[10px] uppercase tracking-[0.2em] text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="kikaru-heading mb-2 text-xl text-black">
                  {tier.name}
                </h3>
                <p className="mb-6 text-sm text-black/60">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="kikaru-heading text-5xl text-black">
                    {tier.highlighted
                      ? isYearly
                        ? tier.yearlyPrice
                        : tier.monthlyPrice
                      : tier.price}
                  </span>
                  <span className="text-sm text-black/40">
                    /{" "}
                    {tier.highlighted
                      ? isYearly
                        ? "year"
                        : "month"
                      : tier.period}
                  </span>
                </div>
              </div>

              <ul className="mb-10 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-black/40"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-black/60">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={cn(
                  "kikaru-btn-dark block w-full py-3 text-center",
                  tier.highlighted && "bg-black text-white hover:bg-black/80 hover:text-white"
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
