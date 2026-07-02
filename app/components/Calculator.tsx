"use client";

import { useCallback, useRef } from "react";
import { FeedbackContext, FeedbackHandle } from "../types";
import StepSection from "./stepSection/StepSection";
import FeedbackBar from "./feedback/FeedbackBar";

export default function Calculator() {
  /**
   * "Feedbackbar" owns all its own state - we need imperative handle to
   * open + prefil it from the restult's DISLIKE button
   * this keeps typing in the textarea from re-rendering other components
   */
  const feedbackRef = useRef<FeedbackHandle>(null);

  const requestFeedback = useCallback(
    (prefill: string, context?: FeedbackContext) => {
      feedbackRef.current?.requestFeedback(prefill, context);
    },
    [],
  );

  return (
    <>
      <div className="mt-8">
        <StepSection onRequestFeedback={requestFeedback} />
      </div>
      <FeedbackBar ref={feedbackRef} />
    </>
  );
}
