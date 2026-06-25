"use client";

import { useState } from "react";
import { EVENT_TYPES, EVENTS, RELATIONS, type Option } from "../lib/events";
import EventCard from "./EventCard";
import { useFeedback } from "./FeedbackContext";

function ThumbsDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

// Short labels for the step rail; full instructions for the heading.
const STEP_LABELS = ["Vrsta događaja", "Događaj", "Odnos"];
const STEP_META = [
  {
    title: "Odaberi vrstu događaja",
    desc: "Za koji tip prigode tražite preporuku?",
  },
  { title: "Odaberi događaj", desc: "Koji se događaj slavi?" },
  {
    title: "Tko ste vi slavljeniku?",
    desc: "Odaberite svoj odnos s osobom koju darujete.",
  },
];

const titleOf = (list: Option[], id: string) =>
  list.find((o) => o.id === id)?.title ?? "";

/** Plain, fast option card for steps 2–3. Hover changes elevation only. */
function OptionCard({
  title,
  index,
  onSelect,
}: {
  title: string;
  index: number;
  onSelect: () => void;
}) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="block w-full rounded-xl border border-line bg-surface px-4 py-4 text-left shadow-sm outline-none transition-[box-shadow,border-color] duration-200 hover:border-accent/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <span className="font-display text-[15px] font-semibold tracking-tight">
          {title}
        </span>
      </button>
    </div>
  );
}

export default function StepSection() {
  const { requestFeedback } = useFeedback();
  // selections = [eventTypeId, eventId, relationId]; length is the current step.
  const [selections, setSelections] = useState<string[]>([]);
  const step = selections.length;

  const eventTypeId = selections[0];
  const stepEvents = eventTypeId ? (EVENTS[eventTypeId] ?? []) : [];
  const stepOptions: Option[] =
    step === 1 ? stepEvents : step === 2 ? RELATIONS : [];

  // Chosen value for a completed step, used as that step's rail label.
  const valueOf = (i: number) => {
    const id = selections[i];
    return i === 0
      ? titleOf(EVENT_TYPES, id)
      : i === 1
        ? titleOf(stepEvents, id)
        : titleOf(RELATIONS, id);
  };

  const select = (id: string) => setSelections((s) => [...s, id]);
  const goToStep = (i: number) => setSelections((s) => s.slice(0, i));

  // Open the feedback panel pre-filled with the chosen combination so the user
  // only has to write what they think is wrong.
  const disagree = () => {
    requestFeedback(
      `Prigoda: ${valueOf(0)}\n` +
        `Događaj: ${valueOf(1)}\n` +
        `Odnos: ${valueOf(2)}\n` +
        `Poruka: `,
    );
  };

  const meta = step < 3 ? STEP_META[step] : null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      {/* Combined step rail + breadcrumb: shows all three steps, your choices,
          which step is active, and lets you jump back. */}
      <nav
        className="animate-fade-up mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
        aria-label="Koraci"
      >
        {STEP_LABELS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <span key={i} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden className="text-muted/40">
                  ›
                </span>
              )}
              {done ? (
                <button
                  type="button"
                  onClick={() => goToStep(i)}
                  className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
                >
                  {valueOf(i)}
                </button>
              ) : (
                <span
                  aria-current={current ? "step" : undefined}
                  className={
                    current ? "font-semibold text-ink" : "text-muted/60"
                  }
                >
                  {label}
                </span>
              )}
            </span>
          );
        })}
      </nav>

      {meta && (
        <div>
          <h2
            className="animate-fade-up font-display text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ animationDelay: "40ms" }}
          >
            {meta.title}
          </h2>
          <p
            className="animate-fade-up mt-2 text-[15px] text-muted"
            style={{ animationDelay: "70ms" }}
          >
            {meta.desc}
          </p>
        </div>
      )}

      {/* Step 1 — image cards. key forces a remount so new cards animate in. */}
      {step === 0 && (
        <div
          key="step-0"
          className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {EVENT_TYPES.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              onSelect={() => select(event.id)}
            />
          ))}
        </div>
      )}

      {/* Steps 2–3 — plain option cards */}
      {(step === 1 || step === 2) && (
        <div
          key={`step-${step}`}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stepOptions.map((o, i) => (
            <OptionCard
              key={o.id}
              title={o.title}
              index={i}
              onSelect={() => select(o.id)}
            />
          ))}
        </div>
      )}

      {/* Done — placeholder result (amount logic comes later; choices show in the rail) */}
      {step === 3 && (
        <div className="animate-fade-up rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Preporuka
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
            Izračun preporučenog iznosa darivanja uskoro stiže.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={() => goToStep(0)}
              className="inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
            >
              Počni iznova
            </button>
            <button
              type="button"
              onClick={disagree}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              <ThumbsDown className="h-4 w-4" />
              Ne slažem se
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
