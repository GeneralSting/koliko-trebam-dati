import Link from "next/link";
import { OptionCardProps } from "../../types";

/**
 * shared card for events/relationships. Renders a real <Link> when `href` is set
 * (so it's crawlable and navigates), otherwise a <button> driven by `onSelect`.
 */
export default function OptionCard({
  title,
  subtitle,
  index,
  onSelect,
  href,
}: OptionCardProps) {
  const className =
    "block w-full rounded-xl border border-line bg-surface px-4 py-4 text-left shadow-sm outline-none transition-[box-shadow,border-color] duration-200 hover:border-accent/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

  const inner = (
    <>
      <span className="block font-display text-[15px] font-semibold tracking-tight">
        {title}
      </span>
      {subtitle && (
        <span className="mt-0.5 block text-xs font-medium text-muted">
          {subtitle}
        </span>
      )}
    </>
  );

  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {href ? (
        <Link href={href} className={className}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onSelect} className={className}>
          {inner}
        </button>
      )}
    </div>
  );
}
