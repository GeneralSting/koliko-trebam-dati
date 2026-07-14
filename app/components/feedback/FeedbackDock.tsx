"use client";

import { FeedbackDockProps } from "@/app/types";
import { useFeedbackBar } from "@/app/hooks/useFeedbackBar";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import FeedbackBar from "./FeedbackBar";
import FeedbackModal from "./FeedbackModal";

/**
 * owns the single feedback controller (and its imperative handle) and renders exactly
 * one presentation for the current viewport: the bottom bar on desktop or the floating-button modal
 * on mobile. Rendering only one keeps the shared textarea/honeypot refs unambigous
 */
export default function FeedbackDock({ ref }: FeedbackDockProps) {
  const feedback = useFeedbackBar(ref);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const hasMounted = useHasMounted();

  // defer until mount so the correct variant renders (no hydration flash). The controller/handle above is live immediately
  if (!hasMounted) return null;

  return isMobile ? (
    <FeedbackModal feedback={feedback} />
  ) : (
    <FeedbackBar feedback={feedback} />
  );
}
