import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "The Grand Archive",
    description:
      "Enter a quiet, abandoned archive and restore the knowledge waiting within.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "The Grand Archive",
      description: "Knowledge is never truly lost. It only waits to be found.",
      images: [{ url: image, width: 1536, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Grand Archive",
      description: "Knowledge is never truly lost. It only waits to be found.",
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
