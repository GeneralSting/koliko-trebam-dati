"use client";

import { useState } from "react";

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20 14.5a2 2 0 0 1-2 2H8.5L5 19.5v-13a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
      <path d="M9 9.5h7" />
      <path d="M9 12.5h4.5" />
    </svg>
  );
}

function ChevronUp({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 15l6-6 6 6" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export default function FeedbackBar() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    // Wiring to email comes later — for now we just acknowledge.
    setSent(true);
    setText("");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface/95 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.22)] backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="kd-feedback-panel"
          className="flex w-full items-center gap-3 px-4 py-3 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ChatIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink">
              Povratna informacija
            </span>
            <span className="block truncate text-xs text-muted">
              nešto nedostaje ili nije točno?
            </span>
          </span>
          <ChevronUp
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          id="kd-feedback-panel"
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="border-t border-line px-4 py-4">
              {sent ? (
                <div className="animate-fade-in flex items-center gap-2 py-2 text-sm font-medium text-accent">
                  <CheckCircle />
                  <span>Hvala! Zaprimili smo vašu poruku.</span>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="ml-auto text-xs font-semibold text-muted transition-colors hover:text-ink"
                  >
                    Pošalji još jednu
                  </button>
                </div>
              ) : (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder="Npr. za ovu prigodu ili odnos iznos bi trebao biti veći jer…"
                    className="w-full resize-none rounded-xl border border-line bg-paper px-3.5 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
                  />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-muted">
                      Vaš prijedlog šalje se izravno nama.
                    </span>
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!text.trim()}
                      className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Pošalji
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
