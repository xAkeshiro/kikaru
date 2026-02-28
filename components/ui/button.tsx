"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary: "kikaru-btn-primary",
  secondary: "kikaru-btn-secondary",
  ghost: [
    "inline-flex items-center justify-center gap-2",
    "bg-transparent border-none",
    "text-[var(--kikaru-text-secondary)]",
    "font-medium text-sm rounded-lg cursor-pointer",
    "transition-colors duration-200",
    "hover:text-[var(--kikaru-text)] hover:bg-[var(--kikaru-surface)]",
  ].join(" "),
  danger: [
    "inline-flex items-center justify-center gap-2",
    "bg-red-600 text-white",
    "font-medium text-sm rounded-lg border-none cursor-pointer",
    "transition-all duration-200",
    "hover:bg-red-700 hover:translate-y-[-1px]",
    "active:translate-y-0",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          loading && "opacity-70 pointer-events-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
