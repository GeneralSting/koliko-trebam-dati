import type { MetadataRoute } from "next";
import { PWA_NAME, SITE_DESCRIPTION, SITE_NAME } from "./lib/site";

/**
 * Served at /manifest.webmanifest, replacing the hand-written public/site.webmanifest.
 * Next links it from every page by itself once this file exists, so the root layout no
 * longer sets metadata.manifest. Generating it buys two things a static file cannot: the
 * install name and description come from the same constants as the <title> and the share
 * cards, and the shape is checked against MetadataRoute.Manifest at build time
 *
 * https://developer.mozilla.org/docs/Web/Manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    /**
     * Stable identity for the installed app. Without it the browser derives one from
     * start_url, so moving the entry point would register as a different application
     */
    id: "/",
    // name is the install prompt and splash screen, short_name the home-screen label
    name: `${SITE_NAME} - Kalkulator darivanja`,
    short_name: PWA_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    // Everything is under the root, so the whole origin stays inside the installed app
    scope: "/",
    lang: "hr",
    dir: "ltr",
    display: "standalone",
    // The splash screen matches the page, not plain white
    background_color: "#f8f6f2",
    theme_color: "#f8f6f2",
    /**
     * purpose "any", not "maskable". These are finished app icons - rounded tile, artwork
     * out to the edges - and a maskable icon is expected to keep its content inside the
     * middle 80% because the platform crops it to its own shape. Declaring them maskable
     * clipped the envelope and double-rounded the corners, and left no plain icon at all,
     * which is what browsers require before offering to install
     */
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
