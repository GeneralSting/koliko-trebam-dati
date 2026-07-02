"use client";

import { OptionCardProps } from "../../types";

export default function OptionCard({
  title,
  subtitle,
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
        <span className="block font-display text-[15px] font-semibold tracking-tight">
          {title}
        </span>
        {subtitle && (
          <span className="mt-0.5 block text-xs font-medium text-muted">
            {subtitle}
          </span>
        )}
      </button>
    </div>
  );
}
