"use client";

import { Eye, MousePointerClick, Link2, Image } from "lucide-react";

interface StatsCardsProps {
  pageViews: number;
  linkCount: number;
  portfolioCount: number;
  isPro: boolean;
}

export function StatsCards({
  pageViews,
  linkCount,
  portfolioCount,
  isPro,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Page Views",
      value: pageViews.toLocaleString(),
      icon: Eye,
      change: null,
    },
    {
      label: "Link Clicks",
      value: isPro ? "0" : "Pro",
      icon: MousePointerClick,
      change: isPro ? null : "Upgrade to track",
    },
    {
      label: "Links",
      value: linkCount.toString(),
      icon: Link2,
      change: null,
    },
    {
      label: "Portfolio Items",
      value: portfolioCount.toString(),
      icon: Image,
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#141414] border border-[#262626] rounded-xl p-5 hover:border-[#8B5CF6]/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                {stat.label}
              </span>
              <Icon className="w-4 h-4 text-[#A1A1AA]" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            {stat.change && (
              <p className="text-xs text-[#A1A1AA] mt-1">{stat.change}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
