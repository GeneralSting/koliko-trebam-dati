import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_EVENTS, getEventMeta, getRelationOptions } from "@/app/lib/events";
import { getResult } from "@/app/lib/results";
import { eventSummary, eventAccusative } from "@/app/lib/eventContent";
import { STEP_LABELS } from "@/app/lib/steps";
import { SITE_URL } from "@/app/lib/site";
import { BreadcrumbStep } from "@/app/types";
import OptionCard from "@/app/components/stepSection/OptionCard";
import StepHeader from "@/app/components/stepSection/StepHeader";
import StepBreadcrumb from "@/app/components/StepBreadcrumb";
import RememberCategory from "@/app/components/RememberCategory";
import JsonLd from "@/app/components/JsonLd";

type Params = { params: Promise<{ event: string }> };

// One statically-generated page per event; unknown slugs 404.
export function generateStaticParams() {
  return ALL_EVENTS.map((event) => ({ event: event.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { event } = await params;
  const meta = getEventMeta(event);
  if (!meta) return {};

  // Accusative phrase ("za krizmu") matches how people search. "novca" in the
  // title, "novaca" in the description covers both money-word variants.
  const phrase = eventAccusative(event, meta.title);
  const title = `Koliko novca dati za ${phrase}?`;
  const description = `Koliko novaca darovati za ${phrase}? Preporučeni iznosi novčanog dara prema vašem odnosu s primateljem, po uobičajenim hrvatskim običajima.`;

  return {
    title,
    description,
    alternates: { canonical: `/${event}` },
    openGraph: { title, description, url: `/${event}` },
  };
}

export default async function EventPage({ params }: Params) {
  const { event } = await params;
  const meta = getEventMeta(event);
  if (!meta) notFound();

  const relations = getRelationOptions(event);
  const summary = eventSummary(event);
  const heading = `Koliko novca dati za ${eventAccusative(event, meta.title)}?`;

  // Category + event are both chosen on the home page (→ "/"); choosing the
  // relationship is what happens here, so it's the current step.
  const steps: [BreadcrumbStep, BreadcrumbStep, BreadcrumbStep] = [
    { label: meta.typeTitle, state: "done", href: "/", resetsCategory: true },
    { label: meta.title, state: "done", href: "/" },
    { label: STEP_LABELS[2], state: "current" },
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
    ],
  };

  // Broad-question FAQ. Its answer is the same summary shown on the page, so the
  // structured data matches visible content (Google's FAQ requirement).
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: heading,
        acceptedAnswer: { "@type": "Answer", text: summary },
      },
    ],
  };

  return (
    <>
      <RememberCategory typeId={meta.typeId} />
      <section className="mx-auto w-full max-w-5xl px-6 mt-8">
        <StepBreadcrumb steps={steps} />
        <StepHeader title={heading} desc={summary} />
        <p className="animate-fade-up mb-5 text-sm font-medium text-muted">
          Odaberite svoj odnos s primateljem za točan iznos:
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relations.map((relation, index) => (
            <OptionCard
              key={relation.id}
              index={index}
              title={relation.title}
              subtitle={getResult(event, relation.id).amount}
              href={`/${event}/${relation.id}`}
            />
          ))}
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
