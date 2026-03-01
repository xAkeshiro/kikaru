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
  inverted?: boolean;
}

export function Logo({ size = "md", className, inverted = false }: LogoProps) {
  return (
    <span
      className={cn(
        "font-heading font-bold uppercase tracking-[0.2em] select-none",
        sizeStyles[size],
        className
      )}
    >
      <span className="kikaru-brand-k">K</span>
      <span className={inverted ? "text-black" : "text-white"}>IKARU</span>
    </span>
  );
}
