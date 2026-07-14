"use client";

import { useRouter } from "next/navigation";
import { ResultViewProps } from "../types";
import { useFeedback } from "./feedback/FeedbackProvider";
import ResultCard from "./stepSection/ResultCard";

/**
 * Client wrapper so the static combination page can still reset (home) and
 * open the feedback bar pre-filled with this exact combination
 */
export default function ResultView({
  result,
  eventId,
  relationId,
  eventTypeTitle,
  eventTitle,
  relationTitle,
}: ResultViewProps) {
  const router = useRouter();
  const requestFeedback = useFeedback();

  const handleReset = () => router.push("/");

  const handleDisagree = () =>
    requestFeedback(
      `Prigoda: ${eventTypeTitle}\n` +
        `Događaj: ${eventTitle}\n` +
        `Odnos: ${relationTitle}\n` +
        `Poruka: `,
      {
        eventTypeTitle,
        eventTitle,
        relationTitle,
        eventId,
        relationId,
        amount: result.amount,
      },
    );

  return (
    <ResultCard
      result={result}
      onReset={handleReset}
      onDisagree={handleDisagree}
    />
  );
}
