"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The site name is the right h1 for the home page and the wrong one everywhere else.
 * Rendered from the layout it gave all 160 calculator pages the same heading - "Koliko
 * Trebam Dati?" - while each page's real question sat in an h2 below it, so Google saw one
 * heading for 160 different queries. Here it is a heading on "/" only; on every other
 * route the page's own question is the h1 and this is branding, which is what a <p> is for.
 *
 * usePathname is why this is a client component. The alternative - rendering the header
 * from each page instead of the layout - would put it back inside <main> and undo the
 * banner landmark. The name is written out rather than imported from lib/site.ts, because
 * that module reaches the event data and would drag it into the client bundle
 */
export default function SiteHeader() {
  const isHome = usePathname() === "/";
  const Brand = isHome ? "h1" : "p";

  return (
    <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-12">
      <header className="animate-fade-up flex flex-col gap-5 border-b border-line pb-7 lg:flex-row lg:items-center lg:gap-14">
        {/* Brand lockup */}
        <div className="flex items-center gap-3">
          {/**
           * The favicon PNG, not favicon.svg: that file is a 1024px raster wrapped in an
           * SVG with no vector paths - 39 KB to draw a 46px mark, and next/image cannot
           * optimize SVG, so it was served whole. This source is 3.7 KB and the optimizer
           * returns about 1.2 KB. `loading` replaces the deprecated `priority`; it still
           * emits a preload link in this version (measured - `preload={false}` does not
           * suppress it), which is fine at this size. alt is empty because the heading
           * beside it already says the name, and announcing it twice adds nothing
           */}
          <Image
            src="/favicon-96x96.png"
            alt=""
            width={46}
            height={46}
            loading="eager"
            className="shrink-0"
          />
          <div>
            <Brand className="font-display text-2xl font-extrabold leading-tight tracking-tight md:text-4xl sm:text-3xl">
              Koliko Trebam Dati?
            </Brand>
            <p className="mt-0.5 font-medium text-ink/70 max-[380px]:text-[14px]">
              Kalkulator darivanja za svaku prigodu
            </p>
          </div>
        </div>

        {/* What it does + link */}
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi i
          vašem odnosu s primateljem.{" "}
          <Link
            href="/about"
            className="group inline font-semibold text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-strong hover:decoration-accent/60"
          >
            Više o tome kako to funkcionira
          </Link>
        </p>
      </header>
    </div>
  );
}
