"use client";

import { useEffect, useRef, useState } from "react";
import { useFeedback } from "./FeedbackContext";

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
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

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Result = { kind: "success" | "error"; msg: string } | null;

export default function FeedbackBar() {
  const { open, setOpen, text, setText, focusSignal } = useFeedback();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [showResult, setShowResult] = useState(false);
  const timers = useRef<number[]>([]);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Focus the textarea (cursor at end) whenever the panel opens or feedback is
  // requested from elsewhere (e.g. the "Ne slažem se" button on the result).
  useEffect(() => {
    if (!open) return;
    const ta = taRef.current;
    if (ta) {
      ta.focus();
      ta.setSelectionRange(ta.value.length, ta.value.length);
    }
  }, [open, focusSignal]);

  const submit = () => {
    if (!text.trim() || loading) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLoading(true);
    setShowResult(false);
    // Simulate the request (no backend yet — always succeeds for now).
    timers.current.push(
      window.setTimeout(() => {
        setLoading(false);
        setResult({ kind: "success", msg: "Hvala! Zaprimili smo vašu poruku." });
        setShowResult(true);
        setText("");
        timers.current.push(window.setTimeout(() => setShowResult(false), 5000));
      }, 1000),
    );
  };

  // Title + arrow are muted by default and take the emphasised ink colour on
  // hover or while open — which signals the bar is interactive.
  const emphasis = open ? "text-ink" : "text-muted group-hover:text-ink";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface/95 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.22)] backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="kd-feedback-panel"
          className="group flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ChatIcon className="h-5 w-5" />
          </span>
          <span className={`font-semibold transition-colors ${emphasis}`}>
            Povratna informacija
          </span>
          <span aria-hidden className="text-muted/50">
            ·
          </span>
          <span className="min-w-0 truncate text-muted">
            nešto nedostaje ili nije točno?
          </span>
          <ChevronUp
            className={`ml-auto h-4 w-4 shrink-0 transition-[transform,color] duration-300 ${emphasis} ${
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
            <div className="px-4 pb-4">
              <div className="flex items-end gap-2.5">
                {/* Border/rounding live on the wrapper with overflow-hidden so the
                    textarea's scrollbar is clipped to the rounded corners. */}
                <div className="flex-1 overflow-hidden rounded-xl border border-line bg-paper transition-colors focus-within:border-accent">
                  <textarea
                    ref={taRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    placeholder="Npr. za ovu prigodu ili odnos iznos bi trebao biti veći jer…"
                    className="block min-h-24 w-full resize-none bg-transparent px-3.5 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-muted/70"
                  />
                </div>
                <button
                  type="button"
                  onClick={submit}
                  disabled={loading || !text.trim()}
                  aria-label="Pošalji"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-strong ${
                    loading ? "cursor-wait" : "disabled:cursor-not-allowed disabled:opacity-40"
                  }`}
                >
                  {loading ? <Spinner className="h-5 w-5" /> : <SendIcon className="h-5 w-5" />}
                </button>
              </div>

              {/* Result line — animates open to make room, fades in, then out after 5s */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: showResult ? "1fr" : "0fr" }}
                aria-live="polite"
              >
                <div className="overflow-hidden">
                  {result && (
                    <p
                      className={`pt-2.5 text-[13px] font-medium transition-opacity duration-300 ${
                        showResult ? "opacity-100" : "opacity-0"
                      } ${result.kind === "error" ? "text-red-600" : "text-accent"}`}
                    >
                      {result.msg}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
