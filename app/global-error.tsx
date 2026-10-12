"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry?: () => void;
}) {
  return (
    <html lang="hr">
      <body
        className="min-h-screen"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Nešto je pošlo po zlu
            </h1>
            <p className="mt-4 leading-relaxed text-muted">
              Dogodila se neočekivana greška. Pokušajte ponovno učitati
              stranicu.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry?.()}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              Pokušajte ponovno
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
