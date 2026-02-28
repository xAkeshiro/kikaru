import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export interface LogoProps {
  size?: keyof typeof sizeStyles;
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-mono font-bold tracking-tight select-none",
        sizeStyles[size],
        className
      )}
    >
      <span className="text-[var(--kikaru-accent)]">k</span>
      <span className="text-[var(--kikaru-text)]">ikaru</span>
    </span>
  );
}
