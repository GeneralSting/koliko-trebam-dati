"use client";

import { StepNavigationItemProps } from "@/app/types";

export default function StepNavigationItem({
  label,
  index,
  currentStep,
  getSelectedTitle,
  onJumpToStep,
}: StepNavigationItemProps) {
  const isFirst = index === 0;
  const isDone = index < currentStep;
  const isCurrent = index === currentStep;

  // Determine the exact string to render
  const displayText = isDone ? getSelectedTitle(index) : label;

  // Compute active vs inactive styling states
  const textClassName = isCurrent ? "font-semibold text-ink" : "text-muted";

  // Action triggered when a completed item is clicked
  const handleItemClick = () => onJumpToStep(index);

  return (
    <span className="flex items-center gap-x-2">
      {!isFirst && (
        <span aria-hidden className="text-muted/40">
          ›
        </span>
      )}

      {isDone ? (
        <button
          type="button"
          onClick={handleItemClick}
          className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        >
          {displayText}
        </button>
      ) : (
        <span
          aria-current={isCurrent ? "step" : undefined}
          className={textClassName}
        >
          {displayText}
        </span>
      )}
    </span>
  );
}
