"use client";

import { FeedbackFormProps } from "@/app/types";
import { SendIcon, Spinner } from "../Icons";

export default function FeedbackForm({
  isMobileView,
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
      {/* Focus thickens the field's own edge to 2px of accent: the border changes colour and
          an inset ring adds the second pixel from the inside, so nothing moves and nothing
          paints outside the box - the collapsing panel above clips that. Matches the search */}
      <div className="flex-1 overflow-hidden rounded-xl border border-line bg-paper transition-colors focus-within:border-accent focus-within:inset-ring-1 focus-within:inset-ring-accent">
        <textarea
          id="kd-feedback-message"
          ref={textareaRef}
          value={text}
          onChange={onTextChange}
          rows={3}
          aria-label="Vaša poruka"
          placeholder="Npr. za ovu prigodu ili odnos iznos bi trebao biti veći jer…"
          className={`block ${isMobileView ? "min-h-36" : "min-h-30"} w-full resize-none bg-transparent px-3.5 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-muted`}
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
