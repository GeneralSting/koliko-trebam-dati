import type { EventType } from "../lib/events";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export default function EventCard({
  event,
  selected,
  onSelect,
  index,
}: {
  event: EventType;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${120 + index * 70}ms` }}>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`group relative aspect-4/5 w-full overflow-hidden rounded-2xl text-left outline-none transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
          selected
            ? "-translate-y-1 shadow-xl ring-2 ring-accent ring-offset-2 ring-offset-paper"
            : "shadow-md hover:-translate-y-1 hover:shadow-xl"
        }`}
      >
        {/* Background image, with a subtle zoom on hover */}
        <span
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${event.image})`, backgroundColor: event.fallback }}
        />
        {/* Bottom shade for title legibility */}
        <span
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.12) 55%, transparent)",
          }}
        />

        {/* Selected check badge */}
        {selected && (
          <span className="animate-pop absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent shadow-md">
            <CheckIcon />
          </span>
        )}

        {/* Title */}
        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="block font-display text-[17px] font-semibold leading-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
            {event.title}
          </span>
        </span>
      </button>
    </div>
  );
}
