import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Served at /sitemap.xml. Small static site, so both routes are listed by hand;
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
