import { EVENT_TYPES } from "@/app/lib/events";
import { EventTypeGridProps } from "@/app/types";
import EventCard from "../EventCard";

export default function EventTypeGrid({ onSelect }: EventTypeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
      {EVENT_TYPES.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          index={index}
          onSelect={() => onSelect(event.id)}
        />
      ))}
    </div>
  );
}
