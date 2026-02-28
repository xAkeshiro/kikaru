import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kikaru - A Smart Creative Platform for All Creators",
    template: "%s | Kikaru",
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
    siteName: "Kikaru",
    title: "Kikaru - A Smart Creative Platform for All Creators",
    description:
      "Create beautiful, interactive portfolio pages and quick-link showcases.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kikaru - A Smart Creative Platform for All Creators",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
