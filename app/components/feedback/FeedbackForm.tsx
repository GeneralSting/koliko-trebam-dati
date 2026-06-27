"use client";

import { FeedbackFormProps } from "@/app/types";
import { SendIcon, Spinner } from "../Icons";

export default function FeedbackForm({
  text,
  isLoading,
  isSendDisabled,
  sendButtonCursorClass,
  textareaRef,
  onTextChange,
  onSubmit,
}: FeedbackFormProps) {
  return (
    <div className="flex items-end gap-2.5">
      {/* Input Text Area Wrapper */}
      <div className="flex-1 overflow-hidden rounded-xl border border-line bg-paper transition-colors focus-within:border-accent">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={onTextChange}
          rows={3}
          placeholder="Npr. za ovu prigodu ili odnos iznos bi trebao biti veći jer…"
          className="block min-h-24 w-full resize-none bg-transparent px-3.5 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-muted/70"
        />
      </div>

      {/* Send Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSendDisabled}
        aria-label="Pošalji"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-strong ${sendButtonCursorClass}`}
      >
        {isLoading ? (
          <Spinner className="h-5 w-5" />
        ) : (
          <SendIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
