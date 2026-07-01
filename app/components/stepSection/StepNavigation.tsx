"use client";

import { StepNavigationProps } from "@/app/types";
import StepNavigationItem from "./StepNavigationItem";

export default function StepNavigation({
  stepLabels,
  currentStep,
  getSelectedTitle,
  onJumpToStep,
}: StepNavigationProps) {
  return (
    <nav
      className="animate-fade-up mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
      aria-label="Koraci"
    >
      {stepLabels.map((label, index) => (
        <StepNavigationItem
          key={index}
          label={label}
          index={index}
          currentStep={currentStep}
          getSelectedTitle={getSelectedTitle}
          onJumpToStep={onJumpToStep}
        />
      ))}
    </nav>
  );
}