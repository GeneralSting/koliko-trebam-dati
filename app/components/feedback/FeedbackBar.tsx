"use client";

import { FeedbackBarProps } from "@/app/types";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackPanel from "./FeedbackPanel";

// Desktop presentation: a persistent bottom bar that expands/collapses in place.
export default function FeedbackBar({ feedback }: FeedbackBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface/95 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.22)] backdrop-blur">
        <FeedbackHeader
          isOpen={feedback.open}
          emphasisClass={feedback.emphasisClass}
          chevronRotationClass={feedback.chevronRotationClass}
          onToggle={feedback.handleToggleOpen}
        />

        {/* Collapsing to 0fr only hides the panel visually, so while it is closed the
            textarea and send button would still be tabbable and readable. "inert" takes
            the whole subtree out of the tab order and the accessibility tree, matching
            what the toggle already reports with aria-expanded (same as the mobile dialog) */}
        <div
          id="kd-feedback-panel"
          inert={!feedback.open}
          aria-hidden={!feedback.open}
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={feedback.panelHeightStyle}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              <FeedbackPanel feedback={feedback} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
