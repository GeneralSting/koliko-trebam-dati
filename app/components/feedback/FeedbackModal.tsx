"use client";

import { MouseEvent, useEffect, useRef } from "react";
import { ChatIcon, CloseIcon } from "../Icons";
import FeedbackPanel from "./FeedbackPanel";
import { FeedbackModalProps } from "@/app/types";

/**
 * mobile presentation: an android style FAB that opens a native modal <dialog>
 *
 * showModal() is what makes it modal - the `open` attribute on its own gives a dialog with
 * no backdrop, no focus trap and no inerting. In exchange the browser handles what this
 * component used to do by hand: it keeps Tab inside the dialog, returns focus to whatever
 * opened it when close() runs, raises Escape as a `cancel` event, paints ::backdrop and
 * inerts the rest of the page
 */

// Matches the duration-300 below; the dialog is only closed once the fade has finished
const FADE_MS = 300;

export default function FeedbackModal({ feedback }: FeedbackModalProps) {
  const { open, handleClose, handleToggleOpen } = feedback;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = (clickEvent: MouseEvent<HTMLDialogElement>) => {
    if (clickEvent.target === clickEvent.currentTarget) handleClose();
  };

  /**
   * Showing and fading have to happen in sequence rather than together: a closed dialog is
   * display:none, so it has to be shown before a fade in can start, and has to stay shown
   * until the fade out has ended. The visible state is a data attribute rather than React
   * state because it is purely a DOM concern - it drives nothing but opacity
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();

      // Next frame, so there is a previous opacity for the transition to start from
      const frame = requestAnimationFrame(() =>
        dialog.setAttribute("data-visible", ""),
      );
      return () => cancelAnimationFrame(frame);
    }

    dialog.removeAttribute("data-visible");
    if (!dialog.open) return;

    /**
     * Close on whichever comes first: the fade ending, or the timer. The timer is not
     * redundant - if the dialog is dismissed before its fade in ever started there is no
     * transition to end, and without it the page would sit inert behind an invisible
     * dialog. close() on an already closed dialog does nothing, so both paths are safe
     */
    const closeDialog = () => dialog.close();
    const timer = window.setTimeout(closeDialog, FADE_MS + 50);
    dialog.addEventListener("transitionend", closeDialog, { once: true });

    return () => {
      window.clearTimeout(timer);
      dialog.removeEventListener("transitionend", closeDialog);
    };
  }, [open]);

  // The dialog sits in the top layer, but the page behind it can still be scrolled
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Floating action button — fades in/out opposite the dialog */}
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

      <dialog
        ref={dialogRef}
        aria-labelledby="kd-feedback-title"
        /**
         * Escape is the browser's to handle and it closes the dialog immediately, so this
         * is how React finds out. It cannot be delayed to fade out first: preventDefault on
         * the keydown is ignored (measured, capture phase included), no `cancel` event is
         * raised, and closedby="none" does not stop it either. A modal dialog is always
         * dismissable by design.
         */
        onClose={handleClose}
        /* A click on ::backdrop is reported on the dialog element itself; everything inside
           the panel lands on the padded wrapper below, so this only fires for clicks outside */
        onClick={handleClick}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface p-0 opacity-0 shadow-xl transition-opacity duration-300 backdrop:bg-ink/40 backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-300 data-visible:opacity-100 data-visible:backdrop:opacity-100"
      >
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <ChatIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p id="kd-feedback-title" className="font-semibold text-ink">
                Povratna informacija
              </p>
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

          <FeedbackPanel isMobileView feedback={feedback} />
        </div>
      </dialog>
    </>
  );
}
