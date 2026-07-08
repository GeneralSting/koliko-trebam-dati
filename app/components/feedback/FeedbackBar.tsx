"use client";

import { FeedbackBarProps } from "@/app/types";
import { useFeedbackBar } from "@/app/hooks/useFeedbackBar";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackForm from "./FeedbackForm";
import FeedbackResult from "./FeedbackResult";

export default function FeedbackBar({ ref }: FeedbackBarProps) {
  const {
    open,
    text,
    loading,
    result,
    textareaRef,
    honeypotRef,
    handleToggleOpen,
    handleTextChange,
    handleSubmit,
    isSendDisabled,
    panelHeightStyle,
    resultHeightStyle,
    emphasisClass,
    chevronRotationClass,
    sendButtonCursorClass,
    resultTextOpacityClass,
    resultTextColorClass,
  } = useFeedbackBar(ref);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface/95 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.22)] backdrop-blur">
        <FeedbackHeader
          isOpen={open}
          emphasisClass={emphasisClass}
          chevronRotationClass={chevronRotationClass}
          onToggle={handleToggleOpen}
        />

        <div
          id="kd-feedback-panel"
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={panelHeightStyle}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
