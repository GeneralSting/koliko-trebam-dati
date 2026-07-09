"use client";

import { ResultCardProps } from "@/app/types";
import { Reload, ThumbsDown } from "../Icons";

export default function ResultCard({
  result,
  onReset,
  onDisagree,
}: ResultCardProps) {
  return (
    <div className="animate-fade-up relative rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <p className="mb-3 text-[12px] italic leading-snug text-muted min-[480px]:absolute min-[480px]:right-6 min-[480px]:top-6 min-[480px]:mb-0 min-[480px]:max-w-[42%] min-[480px]:text-right sm:right-8 sm:top-8">
        Darujte u skladu sa svojim mogućnostima
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Preporučeni iznos
      </p>
      <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {result.amount}
      </p>
      {result.notes && result.notes.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {result.notes.map((note, index) => (
            <li
              key={index}
              className="flex gap-2.5 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
              />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-accent/30 hover:text-ink"
        >
          <Reload className="h-4 w-4" />
          Počni iznova
        </button>
        <button
          type="button"
          onClick={onDisagree}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-accent/30 hover:text-ink"
        >
          <ThumbsDown className="h-4 w-4" />
          Ne slažem se
        </button>
      </div>
    </div>
  );
}
