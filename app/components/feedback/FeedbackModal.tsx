"use client";

import { useEffect } from "react";
import { ChatIcon, CloseIcon } from "../Icons";
import FeedbackPanel from "./FeedbackPanel";
import { FeedbackModalProps } from "@/app/types";

// Mobile presentation: an Android-style floating action button that opens a
// centered modal dialog. The overlay stays mounted and cross-fades via CSS so it
// animates both in and out; the shared controller keeps the entered text (and
// "Ne slažem se" prefill) intact across open/close.
export default function FeedbackModal({ feedback }: FeedbackModalProps) {
  const { open, handleClose, handleToggleOpen } = feedback;

  // While open: close on Escape and lock background scroll.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleClose]);

  return (
    <>
      {/* Floating action button — fades in/out opposite the dialog. */}
      <button
        type="button"
        onClick={handleToggleOpen}
        aria-label="Povratna informacija"
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-opacity duration-300 hover:bg-accent-strong ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ChatIcon className="h-6 w-6" />
      </button>

      {/* Dialog overlay — always mounted so it can fade both in and out. */}
      <div
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop (click to dismiss). */}
        <button
          type="button"
          aria-label="Zatvori"
          onClick={handleClose}
          className="absolute inset-0 bg-ink/40"
        />

        {/* Dialog panel. */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Povratna informacija"
          className={`relative w-full max-w-md rounded-2xl border border-line bg-surface p-4 shadow-xl transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <ChatIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-ink">Povratna informacija</p>
              <p className="truncate text-sm text-muted">
                nešto nedostaje ili nije točno?
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Zatvori"
              className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-line hover:text-ink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <FeedbackPanel feedback={feedback} />
        </div>
      </div>
    </>
  );
}
