"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type FeedbackContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  text: string;
  setText: (text: string) => void;
  /** Bumped each time feedback is requested programmatically — used to refocus. */
  focusSignal: number;
  /** Opens the feedback panel and pre-fills the textarea. */
  requestFeedback: (prefill: string) => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return ctx;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [focusSignal, setFocusSignal] = useState(0);

  const requestFeedback = useCallback((prefill: string) => {
    setText(prefill);
    setOpen(true);
    setFocusSignal((n) => n + 1);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{ open, setOpen, text, setText, focusSignal, requestFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
