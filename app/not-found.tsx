import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center pb-20">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Greška 404
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Stranica nije pronađena
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Poveznica koju ste unijeli je neispravna ili je stranica u
            međuvremenu uklonjena. Vratite se na početnu stranicu i nastavite s
            korištenjem kalkulatora.
          </p>
        </header>

        <div
          className="animate-fade-up mt-12"
          style={{ animationDelay: "120ms" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Natrag na početnu
          </Link>
        </div>
      </div>
    </main>
  );
}
