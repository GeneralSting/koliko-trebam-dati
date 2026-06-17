"use client";

import { useState } from "react";
import { EVENT_TYPES } from "../lib/events";
import EventCard from "./EventCard";

const TOTAL_STEPS = 3;
const CURRENT_STEP = 1; // Only step 1 is implemented for now.

export default function StepSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      <div className="text-center">
        <p
          className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-accent"
          style={{ animationDelay: "40ms" }}
        >
          Korak {CURRENT_STEP} / {TOTAL_STEPS}
        </p>

        <div
          className="animate-fade-up mx-auto mt-3 flex max-w-[160px] gap-1.5"
          style={{ animationDelay: "60ms" }}
          aria-hidden
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < CURRENT_STEP ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>

        <h2
          className="animate-fade-up mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ animationDelay: "80ms" }}
        >
          Odaberi vrstu događaja
        </h2>
        <p
          className="animate-fade-up mt-2 text-[15px] text-muted"
          style={{ animationDelay: "100ms" }}
        >
          Za koji tip prigode tražite preporuku?
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {EVENT_TYPES.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            selected={selected === event.id}
            onSelect={() =>
              setSelected((prev) => (prev === event.id ? null : event.id))
            }
          />
        ))}
      </div>
    </section>
  );
}
