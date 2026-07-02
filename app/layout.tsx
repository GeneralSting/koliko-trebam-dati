import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Koliko Trebam Dati? — Kalkulator darivanja",
    template: "%s — Koliko Trebam Dati?",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "koliko dati",
    "koliko dati novaca",
    "novčani poklon",
    "darivanje",
    "vjenčanje",
    "krštenje",
    "rođendan",
    "kuma",
    "kum",
    "hrvatski običaji",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "/",
    siteName: SITE_NAME,
    title: "Koliko Trebam Dati? — Kalkulator darivanja",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Koliko Trebam Dati? — Kalkulator darivanja",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /**
   * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token Search Console gives
   * you (only if you verify via the HTML-tag method instead of DNS)
   */
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
