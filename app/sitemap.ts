import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { ALL_EVENTS, ALL_EVENT_RELATIONS } from "./lib/events";

/**
 * Served at /sitemap.xml. Generated from the data so every event and
 * event+relationship page is listed for crawlers automatically
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const eventPages: MetadataRoute.Sitemap = ALL_EVENTS.map((event) => ({
    url: `${SITE_URL}/${event.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const combinationPages: MetadataRoute.Sitemap = ALL_EVENT_RELATIONS.map(
    ({ event, relation }) => ({
      url: `${SITE_URL}/${event}/${relation}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    }),
  );

  return [...staticPages, ...eventPages, ...combinationPages];
}
