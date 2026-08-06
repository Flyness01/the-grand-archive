import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theworkweshared.com";

const title = "The Work We Shared | An Interactive Story";
const description =
  "Five moments from two summers of learning, building, and growing with Team Enterprise.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "The Work We Shared",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "The Work We Shared",
    type: "website",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "The Work We Shared — five moments connected by one thread",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
