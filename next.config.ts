import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Static CSP so pages stray statically rendered.
 * Everything the site loads is same-origin: next/font self-hosts and Vercel Analytics/Speed
 * Insights are served from /_vercel/*.
 * 'unsafe-inline' is required for Next's inline hydration scripts; 'unsafe-eval' and the
 * Vercel debug scripts are dev-only
 */
const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
      {
        /**
         * Everything in public/ is served "max-age=0, must-revalidate" by default, so a
         * repeat visitor re-checks every image on every page view. Hashed files under
         * /_next/static/ already get a year and can, because their name changes with their
         * content; these do not, so a day of freshness with a week of stale-while-revalidate
         * is the trade - a replaced image is picked up within a day instead of never being
         * cached at all. The image optimizer passes the upstream value downstream, so this
         * fixes /_next/image responses too
         */
        source: "/:file(.*\\.(?:svg|png|jpg|jpeg|webp|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  images: {
    // Next 16 requires allow-listing qualities (default is [75]). 90 gives the
    // card illustrations noticeably sharper edges; 75 stays available for the rest.
    qualities: [75, 90],
    /**
     * Matches the header above, so an optimized image is cached as long as its source
     * whoever does the optimizing. Next's own optimizer takes the larger of this and the
     * upstream max-age; Vercel's passes the upstream value through. Default is 14400
     */
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
