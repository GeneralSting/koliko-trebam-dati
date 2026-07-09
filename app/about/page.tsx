import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kako funkcionira?",
  description:
    "Saznajte kako Koliko Trebam Dati? računa preporučeni iznos darivanja na temelju prigode i vašeg odnosa s primateljem.",
  alternates: {
    canonical: "/about",
  },
};

const STEPS = [
  {
    title: "Odaberite prigodu",
    body: "Najprije birate vrstu događaja - od obiteljskih slavlja i jubileja do obrazovanja, karijere i ostalih prigoda.",
  },
  {
    title: "Odaberite svoj odnos",
    body: "Zatim označite koliko ste bliski s osobom koju darujete. Odnos je ključan jer izravno utječe na preporučeni iznos.",
  },
  {
    title: "Dobijete preporuku",
    body: "Na temelju prigode i odnosa prikazujemo preporučeni iznos, prilagođen uobičajenim hrvatskim običajima.",
  },
];

const NOTES = [
  {
    title: "Preporuka, ne pravilo",
    body: "Iznosi su orijentacijski i temelje se na uobičajenim hrvatskim običajima. Konačna odluka uvijek je vaša i ovisi o vašim mogućnostima te konkretnoj situaciji.",
  },
  {
    title: "Podaci se stalno poboljšavaju",
    body: "Vrijednosti trenutačno održavamo ručno. Ako mislite da neki iznos nije točan ili da nešto nedostaje, javite nam putem obrasca za povratne informacije i ažurirat ćemo podatke.",
  },
  {
    title: "Bez registracije i bez pohrane podataka",
    body: "Kalkulator radi odmah, bez prijave. Ne tražimo i ne pohranjujemo vaše osobne podatke.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
        <header className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Kako funkcionira
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Preporuka u tri koraka
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            <strong className="font-semibold text-ink">
              Koliko Trebam Dati?
            </strong>{" "}
            pomaže vam da brzo procijenite primjeren iznos novčanog poklona za
            hrvatske prigode - bez nagađanja i neugode. Sve se svodi na dvije
            stvari: <em className="not-italic font-medium text-ink">prigodu</em>{" "}
            i vaš <em className="not-italic font-medium text-ink">odnos</em> s
            primateljem.
          </p>
        </header>

        <ol className="mt-10 space-y-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="animate-fade-up flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm"
              style={{ animationDelay: `${120 + index * 70}ms` }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display font-bold text-accent">
                {index + 1}
              </span>
              <div>
                <h2 className="font-display text-base font-bold">
                  {step.title}
                </h2>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <section
          className="animate-fade-up mt-12"
          style={{ animationDelay: "340ms" }}
        >
          <h2 className="font-display text-lg font-bold">Dobro je znati</h2>
          <div className="mt-4 space-y-5">
            {NOTES.map((note) => (
              <div key={note.title}>
                <h3 className="font-semibold text-ink">{note.title}</h3>
                <p className="mt-1 leading-relaxed text-[15px] text-muted">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div
          className="animate-fade-up mt-12"
          style={{ animationDelay: "420ms" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Otvori kalkulator
          </Link>
        </div>
      </div>
    </main>
  );
}
