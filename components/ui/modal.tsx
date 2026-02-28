"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.4, bounce: 0.15 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && contentRef.current) {
        const focusable = contentRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the first focusable element inside the modal
      requestAnimationFrame(() => {
        if (contentRef.current) {
          const firstFocusable = contentRef.current.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          firstFocusable?.focus();
        }
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      // Restore focus to previously active element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Content */}
          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
            aria-describedby={description ? "modal-description" : undefined}
            className={cn(
              "relative w-full rounded-xl",
              "bg-[var(--kikaru-surface)] border border-[var(--kikaru-border)]",
              "shadow-2xl shadow-black/40",
              "p-6",
              sizeStyles[size],
              className
            )}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4",
                "p-1.5 rounded-md",
                "text-[var(--kikaru-text-secondary)]",
                "hover:text-[var(--kikaru-text)] hover:bg-[var(--kikaru-border)]",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-[var(--kikaru-accent)]"
              )}
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            {(title || description) && (
              <div className="mb-4 pr-8">
                {title && (
                  <h2 className="text-lg font-semibold text-[var(--kikaru-text)]">
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-[var(--kikaru-text-secondary)]"
                  >
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Body */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
