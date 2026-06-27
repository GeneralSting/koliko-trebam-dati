"use client";

import { EVENT_TYPES, EVENTS, RELATIONS } from "@/app/lib/events";
import { getResult } from "@/app/lib/results";
import { STEP_LABELS, STEP_META } from "@/app/lib/steps";
import { Option, StepSectionProps } from "@/app/types";
import { useState, useMemo } from "react";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";
import OptionCard from "./OptionCard";
import ResultCard from "./ResultCard";
import EventCard from "../EventCard";

export default function StepSection({ onRequestFeedback }: StepSectionProps) {
  const [selections, setSelections] = useState<string[]>([]);
  const step = selections.length;

  // --- DATA COMPUTATION ---
  const eventTypeId = selections[0];
  const stepEvents = useMemo(
    () => (eventTypeId ? (EVENTS[eventTypeId] ?? []) : []),
    [eventTypeId],
  );

  const stepOptions = useMemo((): Option[] => {
    if (step === 1) return stepEvents;
    if (step === 2) return RELATIONS;
    return [];
  }, [step, stepEvents]);

  const getSelectedTitle = (index: number) => {
    const id = selections[index];
    if (index === 0) return EVENT_TYPES.find((e) => e.id === id)?.title ?? "";
    if (index === 1) return stepEvents.find((e) => e.id === id)?.title ?? "";
    return RELATIONS.find((e) => e.id === id)?.title ?? "";
  };

  // --- HANDLERS ---
  const selectOption = (id: string) => setSelections((prev) => [...prev, id]);
  const jumpToStep = (index: number) =>
    setSelections((prev) => prev.slice(0, index));

  const handleDisagree = () => {
    onRequestFeedback(
      `Prigoda: ${getSelectedTitle(0)}\n` +
        `Događaj: ${getSelectedTitle(1)}\n` +
        `Odnos: ${getSelectedTitle(2)}\n` +
        `Poruka: `,
    );
  };

  const meta = step < 3 ? STEP_META[step] : null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      <StepNavigation
        stepLabels={STEP_LABELS}
        currentStep={step}
        getSelectedTitle={getSelectedTitle}
        onJumpToStep={jumpToStep}
      />

      {meta && <StepHeader title={meta.title} desc={meta.desc} />}

      {step === 0 && (
        <div
          key="step-0"
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {EVENT_TYPES.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onSelect={() => selectOption(event.id)}
            />
          ))}
        </div>
      )}

      {(step === 1 || step === 2) && (
        <div
          key={`step-${step}`}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stepOptions.map((option, index) => (
            <OptionCard
              key={option.id}
              title={option.title}
              index={index}
              onSelect={() => selectOption(option.id)}
            />
          ))}
        </div>
      )}

      {step === 3 && (
        <ResultCard
          result={getResult(selections[1], selections[2])}
          onReset={() => jumpToStep(0)}
          onDisagree={handleDisagree}
        />
      )}
    </section>
  );
}
