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
    ];
  },
  images: {
    // Next 16 requires allow-listing qualities (default is [75]). 90 gives the
    // card illustrations noticeably sharper edges; 75 stays available for the rest.
    qualities: [75, 90],
  },
};

export default nextConfig;
