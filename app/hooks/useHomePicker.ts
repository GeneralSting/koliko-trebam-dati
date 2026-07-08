import { useState, useSyncExternalStore } from "react";
import { EVENT_TYPES, EVENTS, searchEvents } from "@/app/lib/events";
import { STEP_LABELS, STEP_META } from "@/app/lib/steps";
import {
  readCategory,
  selectCategory as selectCategoryMemory,
  clearCategory as clearCategoryMemory,
  subscribeCategory,
} from "@/app/lib/categoryMemory";
import { BreadcrumbStep } from "@/app/types";

// State + derived values for the landing-page picker: the current search query,
// the remembered category (read from the external store), the flow breadcrumb,
// and the lists to render. HomePicker itself is left as pure layout.
export function useHomePicker() {
  const [query, setQuery] = useState("");

  // Category selection has no URL, so returning to "/" (Back button or a
  // breadcrumb Link from an event page) would otherwise reset to the 4
  // categories. The last category is persisted in sessionStorage and read here,
  // so Back/breadcrumb lands on that category's event list. Event pages write it
  // too, so it's correct even when arriving via search or a direct link.
  const stored = useSyncExternalStore(
    subscribeCategory,
    readCategory,
    () => null, // server snapshot: render the 4 categories, no hydration mismatch
  );
  const category = stored && EVENTS[stored] ? stored : null;

  const selectCategory = (id: string) => selectCategoryMemory(id);
  const clearCategory = () => clearCategoryMemory();

  const isSearching = query.trim() !== "";
  const searchResults = isSearching ? searchEvents(query) : [];
  const categoryEvents = category ? (EVENTS[category] ?? []) : [];
  const categoryTitle =
    EVENT_TYPES.find((type) => type.id === category)?.title ?? "";

  const meta = category ? STEP_META[1] : STEP_META[0];

  // Category is chosen client-side here (no URL); event/relation come later as
  // real pages. So step 1 is "done" (clears on click) once a category is picked.
  const steps: [BreadcrumbStep, BreadcrumbStep, BreadcrumbStep] = [
    category
      ? { label: categoryTitle, state: "done", onClick: clearCategory }
      : { label: STEP_LABELS[0], state: "current" },
    { label: STEP_LABELS[1], state: category ? "current" : "upcoming" },
    { label: STEP_LABELS[2], state: "upcoming" },
  ];

  return {
    query,
    setQuery,
    category,
    steps,
    isSearching,
    searchResults,
    categoryEvents,
    meta,
    selectCategory,
  };
}
