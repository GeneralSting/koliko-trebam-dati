"use client";

import Link from "next/link";
import { StepBreadcrumbProps } from "@/app/types";
import { forgetCategory } from "@/app/lib/categoryMemory";

// One static breadcrumb for the whole flow — always renders all three steps
// (Vrsta događaja › Događaj › Odnos). Each step just swaps its text + colour by
// state: done = accent (navigable), current = ink, upcoming = muted. No
// animation, so it reads as a persistent element across pages.
export default function StepBreadcrumb({ steps }: StepBreadcrumbProps) {
  return (
    <nav
      className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
      aria-label="Koraci"
    >
      {steps.map((step, index) => {
        const textClass =
          step.state === "done"
            ? "font-medium text-accent"
            : step.state === "current"
              ? "font-semibold text-ink"
              : "text-muted";
        const linkClass = `${textClass} underline-offset-2 transition-colors hover:text-accent-strong hover:underline`;

        return (
          <span key={index} className="flex items-center gap-x-2">
            {index > 0 && (
              <span aria-hidden className="text-muted/40">
                ›
              </span>
            )}
            {step.state === "done" && step.href ? (
              <Link
                href={step.href}
                className={linkClass}
                onClick={step.resetsCategory ? forgetCategory : undefined}
              >
                {step.label}
              </Link>
            ) : step.state === "done" && step.onClick ? (
              <button type="button" onClick={step.onClick} className={linkClass}>
                {step.label}
              </button>
            ) : (
              <span
                aria-current={step.state === "current" ? "step" : undefined}
                className={textClass}
              >
                {step.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
