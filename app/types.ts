import { Ref, RefObject } from "react";

export type EventType = {
  id: string;
  title: string;
  image: string;
  fallback: string;
  imageFit?: "cover" | "contain"; // "contain" shows a wide illustration fully; defaults to "cover"
};

export type Option = {
  id: string;
  title: string;
};

// An event flattened together with the category (event type) it belongs to —
// used by the global event search.
export type EventEntry = Option & {
  typeId: string;
  typeTitle: string;
};

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

// Structured context for a piece of feedback (from the result's "Ne slažem se")
// so emails can be sorted/tagged by event + relationship rather than parsed from
// free text.
export type FeedbackContext = {
  eventTypeTitle: string;
  eventTitle: string;
  relationTitle: string;
  eventId: string;
  relationId: string;
  amount: string;
};

export type FeedbackHandle = {
  // Opens the panel, pre-fills the textarea, and optionally carries the event
  // context so the sent email can be sorted by event.
  requestFeedback: (prefill: string, context?: FeedbackContext) => void;
};

export type FeedbackBarProps = {
  ref: RefObject<FeedbackHandle | null>;
};

export type OptionCardProps = {
  title: string;
  subtitle?: string; // optional secondary line (e.g. the category, in search results)
  index: number;
  onSelect: () => void;
};

export type StepSectionProps = {
  onRequestFeedback: (prefill: string, context?: FeedbackContext) => void;
};

// Grid of the four event-type cards (step 0).
export type EventTypeGridProps = {
  onSelect: (id: string) => void;
};

// Grid of selectable options — events (step 1) or relationships (step 2).
export type OptionGridProps = {
  options: Option[];
  onSelect: (id: string) => void;
};

// Cross-category event search results (shown while typing in the search bar).
export type SearchResultsProps = {
  results: EventEntry[];
  query: string;
  onSelect: (event: EventEntry) => void;
};

export type GiftResult = {
  amount: string; // recommended amount, formatted for display (e.g. "100 €", "300 – 500 €")
  notes?: string[]; // optional contextual bullet points
};

export type ResultCardProps = {
  result: GiftResult;
  onReset: () => void;
  onDisagree: () => void;
};

export type StepHeaderProps = {
  title: string;
  desc: string;
};

export type StepNavigationProps = {
  stepLabels: string[];
  currentStep: number;
  getSelectedTitle: (index: number) => string;
  onJumpToStep: (index: number) => void;
};

export type StepNavigationItemProps = {
  label: string;
  index: number;
  currentStep: number;
  getSelectedTitle: (index: number) => string;
  onJumpToStep: (index: number) => void;
};

export type EventCardProps = {
  index: number;
  event: EventType;
  onSelect: () => void;
};

export type FeedbackFormProps = {
  text: string;
  isLoading: boolean;
  isSendDisabled: boolean;
  sendButtonCursorClass: string;
  textareaRef: Ref<HTMLTextAreaElement>;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
};

type Result = { kind: "success" | "error"; msg: string } | null;

export type FeedbackResultProps = {
  result: Result;
  resultHeightStyle: React.CSSProperties;
  resultTextOpacityClass: string;
  resultTextColorClass: string;
};
