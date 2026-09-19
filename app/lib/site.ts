import type { Metadata } from "next";
import { EVENT_TYPES } from "./events";

// Single source of truth for the site's public identity + canonical base URL
function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveBaseUrl();
export const SITE_NAME = "Koliko Trebam Dati?";
export const PWA_NAME = "Koliko Dati"; // Shorter name, for PWA only. Keep in sync with name/short_name in public/site.webmanifest
export const SITE_DESCRIPTION =
  "Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi i vašem odnosu s primateljem, prilagođen hrvatskim običajima.";

// Share image size, for both the generated image (app/opengraph-image.tsx, linked from
// SHARED_OPEN_GRAPH) and the per-category images in public/og
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT =
  "Koliko Trebam Dati? - Kalkulator darivanja za hrvatske prigode";

/**
 * A page that sets its own openGraph replaces the layout's whole openGraph object, and the
 * file-based opengraph-image is only attached at the root. So every openGraph spreads this in
 * (then adds its own title, description and url) to keep the share image and site details
 */
export const SHARED_OPEN_GRAPH = {
  type: "website",
  locale: "hr_HR",
  siteName: SITE_NAME,
  images: [
    {
      url: "/opengraph-image",
      ...OG_IMAGE_SIZE,
      type: "image/png",
      alt: OG_IMAGE_ALT,
    },
  ],
} satisfies Metadata["openGraph"];

/**
 * Share image for event and relation pages: their category's card illustration.
 * public/og holds 1200×630 JPEG crops of public/cards/*.webp, because WhatsApp doesn't
 * reliably preview WebP. Regenerate them if a card image changes:
 *   sips -s format jpeg -s formatOptions 85 --resampleWidth 1200 public/cards/<name>.webp --out public/og/<name>.jpg
 *   sips -c 630 1200 --cropOffset 45 0 public/og/<name>.jpg
 */
export function categoryOgImages(typeId: string) {
  const type = EVENT_TYPES.find((eventType) => eventType.id === typeId);
  if (!type) return SHARED_OPEN_GRAPH.images;

  return [
    {
      url: type.ogImage,
      ...OG_IMAGE_SIZE,
      type: "image/jpeg",
      alt: type.title,
    },
  ];
}
