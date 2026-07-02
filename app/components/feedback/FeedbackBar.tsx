"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FeedbackBarProps, FeedbackContext } from "@/app/types";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackForm from "./FeedbackForm";
import FeedbackResult from "./FeedbackResult";

type Result = { kind: "success" | "error"; msg: string } | null;

export default function FeedbackBar({ ref }: FeedbackBarProps) {
  // --- STATES ---
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [focusSignal, setFocusSignal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [showResult, setShowResult] = useState(false);
  /**
   * Event context when opened via the result's "Ne slažem se"; null for a manual open
   * Sent along so the email can be sorted by event
   */
  const [context, setContext] = useState<FeedbackContext | null>(null);

  // --- REFS LAYER ---
  const timers = useRef<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // --- IMPERATIVE API ---
  useImperativeHandle(
    ref,
    () => ({
      requestFeedback: (prefill: string, ctx?: FeedbackContext) => {
        setText(prefill);
        setContext(ctx ?? null);
        setOpen(true);
        setFocusSignal((n) => n + 1);
      },
    }),
    [],
  );

  // --- LIFECYCLE EFFECTS ---
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (!open) return;
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [open, focusSignal]);

  // --- HANDLERS ---
  const handleToggleOpen = () => {
    if (!open) setContext(null); // opening manually — not tied to a selection
    setOpen((prev) => !prev);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLoading(true);
    setShowResult(false);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          company: honeypotRef.current?.value ?? "",
          context,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setResult({ kind: "success", msg: "Hvala! Zaprimili smo vašu poruku." });
      setText(""); // Clear only on success so a failed send can be retried.
      setContext(null);
    } catch {
      setResult({
        kind: "error",
        msg: "Slanje nije uspjelo. Pokušajte ponovno.",
      });
    } finally {
      setLoading(false);
      setShowResult(true);
      timers.current.push(window.setTimeout(() => setShowResult(false), 5000));
    }
  };

  // --- COMPUTED UI VALUES ---
  const isSendDisabled = loading || !text.trim();
  const panelHeightStyle = { gridTemplateRows: open ? "1fr" : "0fr" };
  const resultHeightStyle = { gridTemplateRows: showResult ? "1fr" : "0fr" };

  const emphasisClass = open ? "text-ink" : "text-muted group-hover:text-ink";
  const chevronRotationClass = open ? "rotate-180" : "";
  const sendButtonCursorClass = loading
    ? "cursor-wait"
    : "disabled:cursor-not-allowed disabled:opacity-40";

  const resultTextOpacityClass = showResult ? "opacity-100" : "opacity-0";
  const resultTextColorClass =
    result?.kind === "error" ? "text-red-600" : "text-accent";

  // --- UI LAYOUT TEMPLATE ---
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface/95 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.22)] backdrop-blur">
        <FeedbackHeader
          isOpen={open}
          emphasisClass={emphasisClass}
          chevronRotationClass={chevronRotationClass}
          onToggle={handleToggleOpen}
        />

        <div
          id="kd-feedback-panel"
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={panelHeightStyle}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              {/* Honeypot: hidden from users, bots that fill it are dropped. */}
              <input
                ref={honeypotRef}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <FeedbackForm
                text={text}
                isLoading={loading}
                isSendDisabled={isSendDisabled}
                sendButtonCursorClass={sendButtonCursorClass}
                textareaRef={textareaRef}
                onTextChange={handleTextChange}
                onSubmit={handleSubmit}
              />

              <FeedbackResult
                result={result}
                resultHeightStyle={resultHeightStyle}
                resultTextOpacityClass={resultTextOpacityClass}
                resultTextColorClass={resultTextColorClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
