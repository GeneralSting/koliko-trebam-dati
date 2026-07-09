"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { FeedbackContext, FeedbackHandle } from "@/app/types";
import FeedbackDock from "./FeedbackDock";

type RequestFeedback = (prefill: string, context?: FeedbackContext) => void;

// Exposes the feedback dock's imperative "open + prefill" across route pages, so
// the result page's "Ne slažem se" can drive the single persistent widget. The
// dock lives in the shared layout, so it survives client-side navigation.
const FeedbackFnContext = createContext<RequestFeedback>(() => {});

export const useFeedback = () => useContext(FeedbackFnContext);

export default function FeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const feedbackRef = useRef<FeedbackHandle>(null);

  const requestFeedback = useCallback<RequestFeedback>((prefill, context) => {
    feedbackRef.current?.requestFeedback(prefill, context);
  }, []);

  return (
    <FeedbackFnContext.Provider value={requestFeedback}>
      {children}
      <FeedbackDock ref={feedbackRef} />
    </FeedbackFnContext.Provider>
  );
}
