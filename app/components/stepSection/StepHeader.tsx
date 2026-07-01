"use client";

import { StepHeaderProps } from "@/app/types";

export default function StepHeader({ title, desc }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <h2
        className="animate-fade-up font-display text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animationDelay: "30ms" }}
      >
        {title}
      </h2>
      <p
        className="animate-fade-up mt-1.5 text-muted"
        style={{ animationDelay: "60ms" }}
      >
        {desc}
      </p>
    </div>
  );
}
