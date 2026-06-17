import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-5 text-center sm:py-6">
        <div className="animate-fade-up flex items-center gap-2.5">
          <Image
            src="/cro-flag.png"
            alt="Hrvatska zastava"
            width={40}
            height={40}
            priority
            className="shrink-0"
          />
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-[26px]">
            Koliko Trebam Dati?
          </h1>
        </div>

        <p
          className="animate-fade-up mt-1.5 text-sm font-medium text-ink/75"
          style={{ animationDelay: "60ms" }}
        >
          Kalkulator darivanja za svaku prigodu
        </p>

        <p
          className="animate-fade-up mt-1.5 max-w-md text-[13px] leading-relaxed text-muted"
          style={{ animationDelay: "110ms" }}
        >
          Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi i
          vašem odnosu s primateljem.{" "}
          <Link
            href="/about"
            className="group inline whitespace-nowrap font-semibold text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-strong hover:decoration-accent/60"
          >
            Više o tome kako to funkcionira
            <span className="ml-0.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </p>
      </div>
    </header>
  );
}
