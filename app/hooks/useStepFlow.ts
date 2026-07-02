"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  EVENT_TYPES,
  EVENTS,
  getRelationOptions,
  relationTitle,
  searchEvents,
} from "@/app/lib/events";
import { getResult } from "@/app/lib/results";
import { EventEntry, FeedbackContext, Option } from "@/app/types";

/**
 * All the state, derived data and navigation for the three-step flow.
 * Kept out of the component so the JSX stays declarative.
 *
 * `selections` drives everything: its length IS the current step
 * (0 = pick type, 1 = pick event, 2 = pick relationship, 3 = result).
 */
export function useStepFlow(
  onRequestFeedback: (prefill: string, context?: FeedbackContext) => void,
) {
  const [selections, setSelections] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const step = selections.length;

  const eventTypeId = selections[0];
  const eventId = selections[1];

  // --- DERIVED OPTIONS ---
  const stepEvents = useMemo(
    () => (eventTypeId ? (EVENTS[eventTypeId] ?? []) : []),
    [eventTypeId],
  );

  // Relationships depend on the chosen event (e.g. weddings have a "kum").
  const stepRelations = useMemo(
    () => (eventId ? getRelationOptions(eventId) : []),
    [eventId],
  );

  const stepOptions = useMemo<Option[]>(() => {
    if (step === 1) return stepEvents;
    if (step === 2) return stepRelations;
    return [];
  }, [step, stepEvents, stepRelations]);

  // Global event search — only relevant while choosing an event (steps 0–1).
  const searchResults = useMemo(() => searchEvents(query), [query]);
  const isSearching = step < 2 && query.trim() !== "";

  // Result shown at step 3.
  const result = step === 3 ? getResult(selections[1], selections[2]) : null;

  const getSelectedTitle = (index: number) => {
    const id = selections[index];
    if (index === 0) return EVENT_TYPES.find((e) => e.id === id)?.title ?? "";
    if (index === 1) return stepEvents.find((e) => e.id === id)?.title ?? "";
    return id ? relationTitle(eventId, id) : "";
  };

  /** --- BACK-BUTTON HANDLING ---
   * While inside the flow, the browser/OS Back button (mouse back button or the
   * mobile back gesture) should return to the previous step instead of leaving
   * the page. We push a history entry for each forward step and reconcile the
   * selections on `popstate`. `pendingTargetRef` lets a breadcrumb/reset jump —
   * which walks history back programmatically — land on an exact step.
   */
  const pendingTargetRef = useRef<number | null>(null);

  // --- NAVIGATION ---
  // Push one history entry per new step so Back returns to the previous step
  // (keeping the existing state so Next's router history stays intact).
  const advanceTo = (next: string[]) => {
    for (let i = selections.length; i < next.length; i++) {
      window.history.pushState(window.history.state, "");
    }
    setSelections(next);
  };

  const selectOption = (id: string) => advanceTo([...selections, id]);

  // Picking a search result sets both the category and the event at once, then
  // jumps straight to that event's relationships.
  const selectEvent = (event: EventEntry) => {
    advanceTo([event.typeId, event.id]);
    setQuery("");
  };

  const jumpToStep = (index: number) => {
    // Walk history back by the number of steps skipped; the popstate handler
    // above applies the change so the history stack stays in sync.
    const delta = index - selections.length;
    if (delta < 0) {
      pendingTargetRef.current = index;
      window.history.go(delta);
    }
  };

  // Opens the feedback panel pre-filled, carrying structured context so the
  // email can be sorted/tagged by event + relationship.
  const handleDisagree = () => {
    const eventTypeTitle = getSelectedTitle(0);
    const eventTitle = getSelectedTitle(1);
    const relTitle = getSelectedTitle(2);
    onRequestFeedback(
      `Prigoda: ${eventTypeTitle}\n` +
        `Događaj: ${eventTitle}\n` +
        `Odnos: ${relTitle}\n` +
        `Poruka: `,
      {
        eventTypeTitle,
        eventTitle,
        relationTitle: relTitle,
        eventId: selections[1],
        relationId: selections[2],
        amount: getResult(selections[1], selections[2]).amount,
      },
    );
  };

  useEffect(() => {
    const onPopState = () => {
      const pending = pendingTargetRef.current;
      if (pending !== null) {
        pendingTargetRef.current = null;
        setSelections((prev) => prev.slice(0, pending));
        return;
      }
      setSelections((prev) =>
        prev.length > 0 ? prev.slice(0, prev.length - 1) : prev,
      );
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return {
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
  };
}
