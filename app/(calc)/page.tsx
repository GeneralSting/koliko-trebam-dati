import HomePicker from "../components/HomePicker";
import JsonLd from "../components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PWA_NAME } from "../lib/site";

/**
 * Tells Google which site name to show above search results (instead of guessing from titles/headings).
 * alternateName ties the short name and domain to it
 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: [PWA_NAME, "kolikodati.com"],
  url: SITE_URL,
  inLanguage: "hr",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "hr",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};

export default function Home() {
  return (
    <>
      {/* Structured data so Google can render a richer result. */}
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={jsonLd} />
      <div className="mt-8">
        <HomePicker />
      </div>
    </>
  );
}
