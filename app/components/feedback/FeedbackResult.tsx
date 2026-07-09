"use client";

import { FeedbackResultProps } from "@/app/types";

export default function FeedbackResult({
  result,
  resultHeightStyle,
  resultTextOpacityClass,
  resultTextColorClass,
}: FeedbackResultProps) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={resultHeightStyle}
      aria-live="polite"
    >
      <div className="overflow-hidden">
        {result && (
          <p
            className={`pt-2.5 text-[13px] font-medium transition-opacity duration-300 ${resultTextOpacityClass} ${resultTextColorClass}`}
          >
            {result.message}
          </p>
        )}
      </div>
    </div>
  );
}
