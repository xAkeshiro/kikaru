"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { container: "w-8 h-8", text: "text-xs", pixels: 32 },
  md: { container: "w-10 h-10", text: "text-sm", pixels: 40 },
  lg: { container: "w-14 h-14", text: "text-lg", pixels: 56 },
  xl: { container: "w-20 h-20", text: "text-2xl", pixels: 80 },
};

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: keyof typeof sizeMap;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  src,
  alt = "",
  name = "",
  size = "md",
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { container, text, pixels } = sizeMap[size];

  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : "?";

  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full overflow-hidden",
        "bg-[var(--kikaru-surface)] border border-[var(--kikaru-border)]",
        container,
        className
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt || name}
          width={pixels}
          height={pixels}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center w-full h-full",
            "bg-gradient-to-br from-[var(--kikaru-gradient-start)] to-[var(--kikaru-gradient-end)]",
            "text-white font-semibold select-none",
            text
          )}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}
    </div>
  );
}
