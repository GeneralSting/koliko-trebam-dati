import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FeedbackContext,
  FeedbackHandle,
  FeedbackSendResult,
} from "@/app/types";

/**
 * All the state, side effects, submit logic and derived presentational values
 * for the feedback bar. FeedbackBar itself is left as pure layout consuming this
 */
export function useFeedbackBar(ref: RefObject<FeedbackHandle | null>) {
  // --- STATES ---
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [focusSignal, setFocusSignal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeedbackSendResult>(null);
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
      requestFeedback: (prefill: string, nextContext?: FeedbackContext) => {
        setText(prefill);
        setContext(nextContext ?? null);
        setOpen(true);
        setFocusSignal((count) => count + 1);
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
  const handleClose = () => setOpen(false);
  const handleTextChange = (
    changeEvent: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setText(changeEvent.target.value);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLoading(true);
    setShowResult(false);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          company: honeypotRef.current?.value ?? "",
          context,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setResult({
        kind: "success",
        message: "Hvala! Zaprimili smo vašu poruku.",
      });
      setText(""); // Clear only on success so a failed send can be retried.
      setContext(null);
    } catch {
      setResult({
        kind: "error",
        message: "Slanje nije uspjelo. Pokušajte ponovno.",
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

  return {
    open,
    text,
    loading,
    result,
    textareaRef,
    honeypotRef,
    handleToggleOpen,
    handleClose,
    handleTextChange,
    handleSubmit,
    isSendDisabled,
    panelHeightStyle,
    resultHeightStyle,
    emphasisClass,
    chevronRotationClass,
    sendButtonCursorClass,
    resultTextOpacityClass,
    resultTextColorClass,
  };
}

// The full feedback state/handlers bundle, passed to the bar and the modal so
// they share one source of truth (text, context, open state) across breakpoints.
export type FeedbackController = ReturnType<typeof useFeedbackBar>;
