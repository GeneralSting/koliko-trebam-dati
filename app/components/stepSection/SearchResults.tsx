import { SearchResultsProps } from "@/app/types";
import OptionCard from "./OptionCard";

export default function SearchResults({
  results,
  query,
  onSelect,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <p className="animate-fade-up text-sm text-muted">
        Nema događaja za „{query.trim()}“.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((event, index) => (
        <OptionCard
          key={`${event.typeId}-${event.id}`}
          title={event.title}
          subtitle={event.typeTitle}
          index={Math.min(index, 6)}
          onSelect={() => onSelect(event)}
        />
      ))}
    </div>
  );
}
