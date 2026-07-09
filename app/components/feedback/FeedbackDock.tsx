"use client";

import { FeedbackDockProps } from "@/app/types";
import { useFeedbackBar } from "@/app/hooks/useFeedbackBar";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import FeedbackBar from "./FeedbackBar";
import FeedbackModal from "./FeedbackModal";

// Owns the single feedback controller (and its imperative handle) and renders
// exactly one presentation for the current viewport: the bottom bar on desktop,
// the floating-button modal on mobile. Rendering only one keeps the shared
// textarea/honeypot refs unambiguous.
export default function FeedbackDock({ ref }: FeedbackDockProps) {
  const feedback = useFeedbackBar(ref);
  const isMobile = useMediaQuery("(max-width: 767px)"); // below Tailwind's `md`
  const hasMounted = useHasMounted();

  // Defer until mount so the correct variant renders (no hydration flash). The
  // controller/handle above is live immediately, so "Ne slažem se" still works.
  if (!hasMounted) return null;

  return isMobile ? (
    <FeedbackModal feedback={feedback} />
  ) : (
    <FeedbackBar feedback={feedback} />
  );
}
