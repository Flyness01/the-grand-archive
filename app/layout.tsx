import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyness01.github.io/the-work-we-shared";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Work We Shared — A Team Story",
  description:
    "Ten connected moments from two summers of learning, building, and growing with a team.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "The Work We Shared — A Team Story",
    description: "Five moments. Two summers. One story about the work we shared.",
    images: [{ url: "/og.png", width: 1536, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Work We Shared — A Team Story",
    description: "Five moments. Two summers. One story about the work we shared.",
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
