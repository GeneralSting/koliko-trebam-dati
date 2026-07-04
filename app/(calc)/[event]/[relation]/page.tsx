import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ALL_EVENT_RELATIONS,
  getEventMeta,
  relationTitle,
} from "@/app/lib/events";
import { RESULTS, getResult } from "@/app/lib/results";
import { eventAccusative } from "@/app/lib/eventContent";
import { SITE_URL } from "@/app/lib/site";
import { BreadcrumbStep } from "@/app/types";
import StepHeader from "@/app/components/stepSection/StepHeader";
import StepBreadcrumb from "@/app/components/StepBreadcrumb";
import RememberCategory from "@/app/components/RememberCategory";
import ResultView from "@/app/components/ResultView";
import JsonLd from "@/app/components/JsonLd";

type Params = { params: Promise<{ event: string; relation: string }> };

// One statically-generated page per valid event + relationship pair.
export function generateStaticParams() {
  return ALL_EVENT_RELATIONS;
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { event, relation } = await params;
  const meta = getEventMeta(event);
  if (!meta || !RESULTS[event]?.[relation]) return {};

  const relTitle = relationTitle(event, relation);
  const result = getResult(event, relation);
  const phrase = eventAccusative(event, meta.title);
  const title = `Koliko novca dati za ${phrase} - ${relTitle}?`;
  const description = `Preporučeni iznos: ${result.amount}. Koliko novca darovati (${relTitle}) za ${phrase}, po uobičajenim hrvatskim običajima.`;

  return {
    title,
    description,
    alternates: { canonical: `/${event}/${relation}` },
    openGraph: { title, description, url: `/${event}/${relation}` },
  };
}

export default async function CombinationPage({ params }: Params) {
  const { event, relation } = await params;
  const meta = getEventMeta(event);
  if (!meta || !RESULTS[event]?.[relation]) notFound();

  const relTitle = relationTitle(event, relation);
  const result = getResult(event, relation);
  const heading = `Koliko novca dati za ${eventAccusative(event, meta.title)} - ${relTitle}?`;

  // On the result page every step is chosen, so each crumb links back to where
  // you'd re-choose it: category/event on home ("/"), the relationship on the
  // event page. The last crumb is now clickable → pick another relationship.
  const steps: [BreadcrumbStep, BreadcrumbStep, BreadcrumbStep] = [
    { label: meta.typeTitle, state: "done", href: "/", resetsCategory: true },
    { label: meta.title, state: "done", href: "/" },
    { label: relTitle, state: "done", href: `/${event}` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.title,
        item: `${SITE_URL}/${event}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: relTitle,
        item: `${SITE_URL}/${event}/${relation}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: heading,
        acceptedAnswer: {
          "@type": "Answer",
          text: [result.amount, ...(result.notes ?? [])].join(" "),
        },
      },
    ],
  };

  return (
    <>
      <RememberCategory typeId={meta.typeId} />
      <section className="mx-auto w-full max-w-5xl px-6 mt-8">
        <StepBreadcrumb steps={steps} />
        <StepHeader
          title={heading}
          desc="Preporuka prilagođena uobičajenim hrvatskim običajima."
        />
        <ResultView
          result={result}
          eventId={event}
          relationId={relation}
          eventTypeTitle={meta.typeTitle}
          eventTitle={meta.title}
          relationTitle={relTitle}
        />
      </section>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
