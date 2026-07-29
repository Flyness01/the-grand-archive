import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyness01.github.io/the-grand-archive";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ship It — A Team Story",
  description:
    "A Slack-inspired puzzle mystery about questions, challenges, and the work that changes you.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Ship It — A Team Story",
    description: "Ten milestones. One project. A story hidden in the work.",
    images: [{ url: "/og.png", width: 1536, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ship It — A Team Story",
    description: "Ten milestones. One project. A story hidden in the work.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
