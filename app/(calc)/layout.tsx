import FeedbackProvider from "@/app/components/feedback/FeedbackProvider";
import SiteHeader from "@/app/components/SiteHeader";

/**
 * Shell shared by the calculator routes (landing, event, combination): the same
 * hero header on every page + the persistent feedback bar. /about is outside
 * this group, so it keeps its own header and has no feedback bar.
 */
export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FeedbackProvider>
      <div className="flex min-h-screen flex-col pb-32">
        <main className="flex-1 pt-10 sm:pt-12">
          <SiteHeader />
          {children}
        </main>
      </div>
    </FeedbackProvider>
  );
}
