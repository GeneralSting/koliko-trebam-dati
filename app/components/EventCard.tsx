import Image from "next/image";
import { EventCardProps } from "../types";

export default function EventCard({ event, index, onSelect }: EventCardProps) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 72}ms` }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="relative aspect-4/5 max-h-80 min-h-60 w-full rounded-2xl text-left shadow-md outline-none transition-shadow duration-200 ease-out hover:shadow-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <Image
          src={event.image}
          alt=""
          fill
          fetchPriority="high"
          sizes="(min-width: 1024px) 256px, 50vw"
          quality={90}
          className="rounded-2xl object-cover"
        />
        {/* Bottom shade for title legibility */}
        <span
          className="absolute inset-x-0 bottom-0 h-3/4 rounded-b-2xl"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.12) 55%, transparent)",
          }}
        />
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
