"use client";

import { STEP_LABELS, STEP_META } from "@/app/lib/steps";
import { StepSectionProps } from "@/app/types";
import { useStepFlow } from "../../hooks/useStepFlow";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import EventTypeGrid from "./EventTypeGrid";
import OptionGrid from "./OptionGrid";
import ResultCard from "./ResultCard";

export default function StepSection({ onRequestFeedback }: StepSectionProps) {
  const {
    step,
    query,
    setQuery,
    isSearching,
    searchResults,
    stepOptions,
    result,
    getSelectedTitle,
    selectOption,
    selectEvent,
    jumpToStep,
    handleDisagree,
  } = useStepFlow(onRequestFeedback);

  const meta = step < 3 ? STEP_META[step] : null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      {/* Search is only for picking an event, so show it during steps 0–1. */}
      {step < 2 && (
        <div className="animate-fade-up mb-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      )}

      <StepNavigation
        stepLabels={STEP_LABELS}
        currentStep={step}
        getSelectedTitle={getSelectedTitle}
        onJumpToStep={jumpToStep}
      />

      {isSearching ? (
        <SearchResults
          results={searchResults}
          query={query}
          onSelect={selectEvent}
        />
      ) : (
        <>
          {meta && <StepHeader title={meta.title} desc={meta.desc} />}

          {step === 0 && <EventTypeGrid onSelect={selectOption} />}

          {(step === 1 || step === 2) && (
            <OptionGrid
              key={`step-${step}`}
              options={stepOptions}
              onSelect={selectOption}
            />
          )}

          {step === 3 && result && (
            <ResultCard
              result={result}
              onReset={() => jumpToStep(0)}
              onDisagree={handleDisagree}
            />
          )}
        </>
      )}
    </section>
  );
}
