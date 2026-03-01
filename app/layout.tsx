import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KIKARU - A Smart Creative Platform for All Creators",
    template: "%s | KIKARU",
  },
  description:
    "Create beautiful, interactive portfolio pages and quick-link showcases. The smart creative platform built for artists and the creative community.",
  keywords: [
    "portfolio",
    "creator",
    "artist",
    "linktree",
    "creative",
    "showcase",
    "anime",
    "art portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KIKARU",
    title: "KIKARU - A Smart Creative Platform for All Creators",
    description:
      "Create beautiful, interactive portfolio pages and quick-link showcases.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KIKARU - A Smart Creative Platform for All Creators",
    description:
      "Create beautiful, interactive portfolio pages and quick-link showcases.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
