"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* -------------------------------------------------------
   Spinner
   ------------------------------------------------------- */

const spinnerSizes = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-3",
};

export interface SpinnerProps {
  size?: keyof typeof spinnerSizes;
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full animate-spin",
        "border-[var(--kikaru-border)] border-t-[var(--kikaru-accent)]",
        spinnerSizes[size],
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/* -------------------------------------------------------
   Skeleton
   ------------------------------------------------------- */

export interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedStyles = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <motion.div
      className={cn(
        "bg-[var(--kikaru-border)]",
        roundedStyles[rounded],
        className
      )}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* -------------------------------------------------------
   PageLoader - full-page centered spinner with fade-in
   ------------------------------------------------------- */

export function PageLoader() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-[var(--kikaru-text-secondary)]">
          Loading...
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   CardSkeleton - reusable card-shaped skeleton
   ------------------------------------------------------- */

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-[var(--kikaru-border)]",
        "bg-[var(--kikaru-surface)]",
        className
      )}
    >
      <Skeleton className="h-4 w-3/4 mb-3" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-4" />
      <Skeleton className="h-8 w-24" rounded="lg" />
    </div>
  );
}
