import FeedbackProvider from "@/app/components/feedback/FeedbackProvider";
import SiteHeader from "@/app/components/SiteHeader";

/**
 * Shell shared by the calculator routes (landing, event, combination): the same
 * hero header on every page + the persistent feedback bar. /about is outside
 * this group, so it keeps its own header and has no feedback bar.
 *
 * The header sits outside <main> on purpose: a <header> nested inside <main> is not a
 * banner landmark, so no page had one. There is deliberately no footer - the whole point
 * of the page is the three steps, and anything below them competes with that
 */
export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FeedbackProvider>
      <div className="flex min-h-screen flex-col pb-32">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </div>
    </FeedbackProvider>
  );
}
