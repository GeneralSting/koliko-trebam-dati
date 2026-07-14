"use client";

import FeedbackForm from "./FeedbackForm";
import FeedbackResult from "./FeedbackResult";
import { FeedbackPanelProps } from "@/app/types";

/**
 * interactive body of the feedback UI - honeypot + textarea/send + result
 * shared by both the desktop bar and the mobile modal so the two presentations
 * never duplicate the form - driven entirely by the shared controller
 */
export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  /**
   * destructure into locals so the ref-in-render rule tracks each binding individually
   * (the refs are forwarded. the rest are plain values)
   * reading 'feedback.textareaRef' etc. directly in JSX trips "refs during render"
   */
  const {
    honeypotRef,
    text,
    loading,
    isSendDisabled,
    sendButtonCursorClass,
    textareaRef,
    handleTextChange,
    handleSubmit,
    result,
    resultHeightStyle,
    resultTextOpacityClass,
    resultTextColorClass,
  } = feedback;

  return (
    <>
      {/* Honeypot: hidden from users, bots that fill it are dropped. */}
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <FeedbackForm
        text={text}
        isLoading={loading}
        isSendDisabled={isSendDisabled}
        sendButtonCursorClass={sendButtonCursorClass}
        textareaRef={textareaRef}
        onTextChange={handleTextChange}
        onSubmit={handleSubmit}
      />

      <FeedbackResult
        result={result}
        resultHeightStyle={resultHeightStyle}
        resultTextOpacityClass={resultTextOpacityClass}
        resultTextColorClass={resultTextColorClass}
      />
    </>
  );
}
