import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  PWA_NAME,
  SHARED_OPEN_GRAPH,
} from "./lib/site";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Both subsets are required: Croatian diacritics (č ć ž š đ) live in latin-ext, which
 * supplements latin rather than replacing it. What is dropped is the preload link for the
 * display face - four font files preloaded from the root layout competed with the LCP
 * image for bandwidth. Headings still render immediately in Next's metric-matched
 * fallback and swap when the face arrives
 */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
  display: "swap",
  preload: false,
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Koliko Trebam Dati? - Kalkulator darivanja",
    template: "%s - Kalkulator darivanja",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "koliko dati",
    "koliko dati novaca",
    "novčani poklon",
    "darivanje",
    "vjenčanje",
    "svadba",
    "krštenje",
    "kuma",
    "kum",
    "hrvatski običaji",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    url: "/",
    title: "Koliko Trebam Dati? - Kalkulator darivanja",
    description: SITE_DESCRIPTION,
  },
  /**
   * No title/description/images here: Next fills them from each page's openGraph,
   * so every page's share card gets its own title
   */
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // iOS home-screen label; app/manifest.ts covers Android/desktop installs, and Next
  // links it from every page itself - setting metadata.manifest here would duplicate it
  appleWebApp: { title: PWA_NAME },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${schibsted.variable} ${hanken.variable} scroll-smooth`}
    >
      <body className="min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
