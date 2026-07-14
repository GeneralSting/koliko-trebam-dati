"use client";

import { useEffect } from "react";
import { rememberCategory } from "@/app/lib/categoryMemory";

/**
 * Records the current event's category so that navigating back to "/" (Back button or a breadcrumb Link)
 * restores that category's event list - correct even when the page was reached via search or a direct link
 * renders nothin
 */
export default function RememberCategory({ typeId }: { typeId: string }) {
  useEffect(() => {
    rememberCategory(typeId);
  }, [typeId]);

  return null;
}
