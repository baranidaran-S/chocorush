import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const title = `${site.name} — Cakes, Custom Birthday Cakes, Waffles & Brownies`;

// The share image itself comes from app/opengraph-image.png.
export const metadata: Metadata = {
  title,
  description: site.tagline,
  openGraph: { title, description: site.tagline, siteName: site.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description: site.tagline },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
