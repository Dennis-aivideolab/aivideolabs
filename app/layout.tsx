import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VideoLabs AI – Kreative AI-gestützte Videoinhalte",
  description: "Wir transformieren deine Vision in professionelle, virale Videoinhalte – powered by moderne KI-Technologie. Video Production, AI Design, Advertising Content & Digital Solutions.",
  keywords: ["Video Production", "AI Design", "KI Videoinhalte", "Schweiz", "Social Media", "TikTok", "Next.js"],
  openGraph: {
    title: "VideoLabs AI",
    description: "Kreative AI-gestützte Videoinhalte – powered by moderne KI-Technologie",
    type: "website",
    locale: "de_CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
