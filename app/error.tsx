"use client";

import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry?: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center pb-20">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Greška
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Nešto je pošlo po zlu
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Stranicu trenutačno nije moguće prikazati. Pokušajte ponovno - ako
            se greška ponovi, vratite se na početnu stranicu i nastavite s
            kalkulatorom.
          </p>
        </header>

        <div
          className="animate-fade-up mt-12 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "120ms" }}
        >
          <button
            type="button"
            onClick={() => unstable_retry?.()}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Pokušajte ponovno
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Natrag na početnu
          </Link>
        </div>

        {/* Server-side errors arrive with only this hash; it is what matches a report to the logs */}
        {error.digest && (
          <p className="mt-8 text-sm text-muted">
            Šifra greške: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </main>
  );
}
