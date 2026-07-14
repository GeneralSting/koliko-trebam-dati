import { Ref, RefObject } from "react";
import { FeedbackController } from "./hooks/useFeedbackBar";

export type EventType = {
  id: string;
  title: string;
  image: string;
  fallback: string;
};

export type Option = {
  id: string;
  title: string;
};

// An event flattened together with the category (event type) it belongs to - used by the global event search
export type EventEntry = Option & {
  typeId: string;
  typeTitle: string;
};

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Structured context for a piece of feedback (from the result's "Ne slažem se") so
 * emails can be sorted/tagged by event + relationship rather than parsed from free text
 */
export type FeedbackContext = {
  eventTypeTitle: string;
  eventTitle: string;
  relationTitle: string;
  eventId: string;
  relationId: string;
  amount: string;
};

export type FeedbackHandle = {
  // Opens the panel, pre-fills the textarea, and optionally carries the event context so the sent email can be sorted by event
  requestFeedback: (prefill: string, context?: FeedbackContext) => void;
};

export type FeedbackDockProps = {
  ref: RefObject<FeedbackHandle | null>;
};

export type FeedbackPanelProps = {
  feedback: FeedbackController;
};

export type FeedbackModalProps = {
  feedback: FeedbackController;
};

export type FeedbackBarProps = {
  feedback: FeedbackController;
};

export type FeedbackHeaderProps = {
  isOpen: boolean;
  emphasisClass: string;
  chevronRotationClass: string;
  onToggle: () => void;
};

export type OptionCardProps = {
  title: string;
  subtitle?: string; // optional secondary line (e.g. the category, or the amount)
  index: number;
  onSelect?: () => void; // renders a <button>; ignored when `href` is set
  href?: string; // when set, the card is a real <Link> (crawlable navigation)
};

/**
 * One of the three fixed steps in the flow breadcrumb. `done` steps are
 * navigable (href for a route, or onClick for the client-only category step)
 */
export type BreadcrumbStep = {
  label: string;
  state: "done" | "current" | "upcoming";
  href?: string;
  onClick?: () => void;
  resetsCategory?: boolean; // clears the remembered category on click (4 categories)
};

export type StepBreadcrumbProps = {
  steps: [BreadcrumbStep, BreadcrumbStep, BreadcrumbStep];
};

// Interactive result card on a combination page (wires reset + "Ne slažem se").
export type ResultViewProps = {
  result: GiftResult;
  eventId: string;
  relationId: string;
  eventTypeTitle: string;
  eventTitle: string;
  relationTitle: string;
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
  onTextChange: (changeEvent: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
};

// Outcome of a feedback send: a success/error banner, or null while idle.
export type FeedbackSendResult = {
  kind: "success" | "error";
  message: string;
} | null;

export type FeedbackResultProps = {
  result: FeedbackSendResult;
  resultHeightStyle: React.CSSProperties;
  resultTextOpacityClass: string;
  resultTextColorClass: string;
};
