"use client";

import { OptionCardProps } from "../../types";

export default function OptionCard({
  title,
  index,
  onSelect,
}: OptionCardProps) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="block w-full rounded-xl border border-line bg-surface px-4 py-4 text-left shadow-sm outline-none transition-[box-shadow,border-color] duration-200 hover:border-accent/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <span className="font-display text-[15px] font-semibold tracking-tight">
          {title}
        </span>
      </button>
    </div>
  );
}
