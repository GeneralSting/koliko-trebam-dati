"use client";

import { FeedbackHeaderProps } from "@/app/types";
import { ChatIcon, ChevronUp } from "../Icons";

export default function FeedbackHeader({
  isOpen,
  emphasisClass,
  chevronRotationClass,
  onToggle,
}: FeedbackHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="kd-feedback-panel"
      className="group flex w-full items-center gap-2.5 px-4 py-3 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <ChatIcon className="h-5 w-5" />
      </span>
      <span className={`font-semibold transition-colors ${emphasisClass}`}>
        Povratna informacija
      </span>
      <span aria-hidden className="text-muted/50">
        ·
      </span>
      <span className="min-w-0 truncate text-muted">
        nešto nedostaje ili nije točno?
      </span>
      <ChevronUp
        className={`ml-auto h-4 w-4 shrink-0 transition-[transform,color] duration-300 ${emphasisClass} ${chevronRotationClass}`}
      />
    </button>
  );
}
