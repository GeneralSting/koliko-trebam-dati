import { Ref, RefObject } from "react";

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

export type FeedbackHandle = {
  requestFeedback: (prefill: string) => void; // Opens the panel and pre-fills the textarea
};

export type FeedbackBarProps = {
  ref: RefObject<FeedbackHandle | null>;
};

export type OptionCardProps = {
  title: string;
  index: number;
  onSelect: () => void;
};

export type StepSectionProps = {
  onRequestFeedback: (prefill: string) => void;
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
