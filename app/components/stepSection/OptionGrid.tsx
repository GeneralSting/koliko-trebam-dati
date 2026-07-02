import { OptionGridProps } from "@/app/types";
import OptionCard from "./OptionCard";

/**
 * Steps 1 & 2 — a grid of selectable events or relationships. The parent remounts
 * this (via `key`) when switching steps so the entry animation replays
 */
export default function OptionGrid({ options, onSelect }: OptionGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option, index) => (
        <OptionCard
          key={option.id}
          title={option.title}
          index={index}
          onSelect={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}
