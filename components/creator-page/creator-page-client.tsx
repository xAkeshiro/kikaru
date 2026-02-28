"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Instagram,
  Github,
  Youtube,
  Twitch,
  Palette,
  Heart,
  Music,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import type { CreatorPageData, PortfolioItem, SocialPlatform } from "@/lib/types";

interface CreatorPageClientProps {
  data: CreatorPageData;
  themeStyles: Record<string, string>;
  isPro: boolean;
}

const PLATFORM_ICONS: Record<SocialPlatform, React.ElementType> = {
  twitter: Globe,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
  twitch: Twitch,
  pixiv: Palette,
  artstation: Palette,
  kofi: Heart,
  tiktok: Music,
  custom: ExternalLink,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
} as const;

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function CreatorPageClient({
  data,
  themeStyles,
  isPro,
}: CreatorPageClientProps) {
  const { profile, socials, links, portfolio } = data;
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const activeLinks = links.filter((link) => link.is_active);

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: profile.id }),
    });
  }, [profile.id]);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeLightbox();
      }
    }

    if (lightboxItem) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxItem, closeLightbox]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        ...themeStyles,
        backgroundColor: "var(--kikaru-bg)",
        color: "var(--kikaru-text)",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 text-center"
          >
            {profile.avatar_url && (
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-[var(--kikaru-border)]">
                <Image
                  src={profile.avatar_url}
                  alt={profile.display_name || profile.username}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold">
                {profile.display_name || profile.username}
              </h1>
              {profile.bio && (
                <p
                  className="max-w-md text-sm"
                  style={{ color: "var(--kikaru-text-secondary)" }}
                >
                  {profile.bio}
                </p>
              )}
              {profile.location && (
                <p
                  className="mt-1 flex items-center gap-1 text-xs"
                  style={{ color: "var(--kikaru-text-secondary)" }}
                >
                  <MapPin size={12} />
                  {profile.location}
                </p>
              )}
            </div>
          </motion.div>

          {/* Social Icons */}
          {socials.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3"
            >
              {socials.map((social, index) => {
                const platform = social.platform as SocialPlatform;
                const Icon = PLATFORM_ICONS[platform] || Globe;
                const isTwitter = platform === "twitter";

                return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.06,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{
                      backgroundColor: "var(--kikaru-surface)",
                      border: "1px solid var(--kikaru-border)",
                    }}
                    aria-label={social.platform}
                  >
                    {isTwitter ? (
                      <TwitterIcon className="h-5 w-5" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </motion.a>
                );
              })}
            </motion.div>
          )}

          {/* Links */}
          {activeLinks.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex w-full flex-col gap-3"
            >
              {activeLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{
                    borderColor: "var(--kikaru-accent)",
                    scale: 1.01,
                  }}
                  whileTap={{ scale: 0.99 }}
                  className="flex w-full items-center justify-center rounded-lg px-6 py-4 text-center font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--kikaru-surface)",
                    border: "1px solid var(--kikaru-border)",
                    color: "var(--kikaru-text)",
                  }}
                >
                  {link.title}
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Portfolio Grid */}
          {portfolio.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              {portfolio.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLightboxItem(item)}
                  className="group relative aspect-square w-full overflow-hidden rounded-lg"
                  style={{
                    border: "1px solid var(--kikaru-border)",
                  }}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                    <p className="px-3 text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-1 px-3 text-xs text-white/80 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Footer */}
          {!isPro && (
            <motion.div
              variants={itemVariants}
              className="pt-8 pb-4"
            >
              <a
                href="https://kikaru.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-opacity hover:opacity-80"
                style={{ color: "var(--kikaru-text-secondary)" }}
              >
                Made with Kikaru
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl"
              style={{
                backgroundColor: "var(--kikaru-surface)",
                border: "1px solid var(--kikaru-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative aspect-video w-full shrink-0">
                <Image
                  src={lightboxItem.image_url}
                  alt={lightboxItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2 p-5">
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--kikaru-text)" }}
                >
                  {lightboxItem.title}
                </h2>
                {lightboxItem.description && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--kikaru-text-secondary)" }}
                  >
                    {lightboxItem.description}
                  </p>
                )}
                {lightboxItem.external_url && (
                  <a
                    href={lightboxItem.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, var(--kikaru-gradient-start), var(--kikaru-gradient-end))`,
                    }}
                  >
                    <ExternalLink size={14} />
                    View Project
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
