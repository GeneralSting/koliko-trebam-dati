"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { FeedbackBarProps } from "@/app/types";
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

  // --- REFS LAYER ---
  const timers = useRef<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- IMPERATIVE API ---
  useImperativeHandle(
    ref,
    () => ({
      requestFeedback: (prefill: string) => {
        setText(prefill);
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
  const handleToggleOpen = () => setOpen((prev) => !prev);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleSubmit = () => {
    if (!text.trim() || loading) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLoading(true);
    setShowResult(false);

    timers.current.push(
      window.setTimeout(() => {
        setLoading(false);
        setResult({
          kind: "success",
          msg: "Hvala! Zaprimili smo vašu poruku.",
        });
        setShowResult(true);
        setText("");

        timers.current.push(
          window.setTimeout(() => setShowResult(false), 5000),
        );
      }, 1000),
    );
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
