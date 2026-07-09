"use client";

import { SearchBarProps } from "@/app/types";
import { CloseIcon, SearchIcon } from "../Icons";

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(changeEvent) => onChange(changeEvent.target.value)}
        placeholder="Pretraži događaj (npr. vjenčanje, rođendan, sprovod)…"
        aria-label="Pretraži događaj"
        className="w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-10 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Očisti pretragu"
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted transition-colors hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
