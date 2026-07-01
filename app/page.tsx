import Image from "next/image";
import Link from "next/link";
import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pb-32">
      <main className="flex-1 pt-10 sm:pt-12">
        {/* Compact intro - part of the content, arranged as a two-column hero */}
        <div className="mx-auto max-w-5xl px-6">
          <header className="animate-fade-up flex flex-col gap-5 border-b border-line pb-7 lg:flex-row lg:items-center lg:gap-14">
            {/* Brand lockup */}
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.svg"
                alt="Website logo"
                width={46}
                height={46}
                priority
                className="shrink-0"
              />
              <div>
                <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-4xl sm:text-3xl">
                  Koliko Trebam Dati?
                </h1>
                <p className="mt-0.5 font-medium text-ink/70">
                  Kalkulator darivanja za svaku prigodu
                </p>
              </div>
            </div>

            {/* What it does + link */}
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi
              i vašem odnosu s primateljem.{" "}
              <Link
                href="/about"
                className="group inline font-semibold text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-strong hover:decoration-accent/60"
              >
                Više o tome kako to funkcionira
              </Link>
            </p>
          </header>
        </div>

        <Calculator />
      </main>
    </div>
  );
}
