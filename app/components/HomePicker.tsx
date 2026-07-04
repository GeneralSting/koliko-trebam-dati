"use client";

import { useState, useSyncExternalStore } from "react";
import { EVENT_TYPES, EVENTS, searchEvents } from "@/app/lib/events";
import { STEP_LABELS, STEP_META } from "@/app/lib/steps";
import {
  readCategory,
  selectCategory as selectCategoryMemory,
  clearCategory as clearCategoryMemory,
  subscribeCategory,
} from "@/app/lib/categoryMemory";
import { BreadcrumbStep } from "@/app/types";
import EventCard from "./EventCard";
import OptionCard from "./stepSection/OptionCard";
import SearchBar from "./stepSection/SearchBar";
import StepHeader from "./stepSection/StepHeader";
import StepBreadcrumb from "./StepBreadcrumb";

// Landing-page picker: choose a category (client-side reveal, no URL change),
// then pick an event — which is a real <Link> to that event's own page. Search
// spans all events and also links straight to the event pages.
export default function HomePicker() {
  const [query, setQuery] = useState("");

  // Category selection has no URL, so returning to "/" (Back button or a
  // breadcrumb Link from an event page) would otherwise reset to the 4
  // categories. The last category is persisted in sessionStorage and read here,
  // so Back/breadcrumb lands on that category's event list. Event pages write it
  // too, so it's correct even when arriving via search or a direct link.
  const stored = useSyncExternalStore(
    subscribeCategory,
    readCategory,
    () => null, // server snapshot: render the 4 categories, no hydration mismatch
  );
  const category = stored && EVENTS[stored] ? stored : null;

  const selectCategory = (id: string) => selectCategoryMemory(id);
  const clearCategory = () => clearCategoryMemory();

  const isSearching = query.trim() !== "";
  const searchResults = isSearching ? searchEvents(query) : [];
  const categoryEvents = category ? (EVENTS[category] ?? []) : [];
  const categoryTitle =
    EVENT_TYPES.find((type) => type.id === category)?.title ?? "";

  const meta = category ? STEP_META[1] : STEP_META[0];

  // Category is chosen client-side here (no URL); event/relation come later as
  // real pages. So step 1 is "done" (clears on click) once a category is picked.
  const steps: [BreadcrumbStep, BreadcrumbStep, BreadcrumbStep] = [
    category
      ? { label: categoryTitle, state: "done", onClick: clearCategory }
      : { label: STEP_LABELS[0], state: "current" },
    { label: STEP_LABELS[1], state: category ? "current" : "upcoming" },
    { label: STEP_LABELS[2], state: "upcoming" },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      <div className="animate-fade-up mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <StepBreadcrumb steps={steps} />

      {isSearching ? (
        searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((event, index) => (
              <OptionCard
                key={`${event.typeId}-${event.id}`}
                index={Math.min(index, 6)}
                title={event.title}
                subtitle={event.typeTitle}
                href={`/${event.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="animate-fade-up text-sm text-muted">
            Nema događaja za „{query.trim()}“.
          </p>
        )
      ) : (
        <>
          <StepHeader title={meta.title} desc={meta.desc} />

          {category ? (
            <div
              key={category}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categoryEvents.map((event, index) => (
                <OptionCard
                  key={event.id}
                  index={index}
                  title={event.title}
                  href={`/${event.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {EVENT_TYPES.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  onSelect={() => selectCategory(event.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
