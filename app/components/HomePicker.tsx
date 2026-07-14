"use client";

import { EVENT_TYPES } from "@/app/lib/events";
import { useHomePicker } from "@/app/hooks/useHomePicker";
import EventCard from "./EventCard";
import OptionCard from "./stepSection/OptionCard";
import SearchBar from "./stepSection/SearchBar";
import StepHeader from "./stepSection/StepHeader";
import StepBreadcrumb from "./StepBreadcrumb";

/**
 * landing page picker: choose a category (client-side reveal, no URL change),
 * then pick an event - which is a real <Link> to that event's own page. Seach
 * spans all events and also links straig to the event pages
 */
export default function HomePicker() {
  const {
    query,
    setQuery,
    category,
    steps,
    isSearching,
    searchResults,
    categoryEvents,
    meta,
    selectCategory,
  } = useHomePicker();

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
