import { StepHeaderProps } from "@/app/types";

/**
 * `as` defaults to h2 because on the home page this is a step instruction ("Odaberi vrstu
 * događaja") sitting under the site name. On event and combination pages the title is the
 * page's actual question, so those pass h1 and own the page's heading
 */
export default function StepHeader({
  title,
  desc,
  as: Heading = "h2",
}: StepHeaderProps) {
  return (
    <div className="mb-8">
      <Heading
        className="animate-fade-up font-display text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animationDelay: "30ms" }}
      >
        {title}
      </Heading>
      <p
        className="animate-fade-up mt-1.5 text-muted"
        style={{ animationDelay: "60ms" }}
      >
        {desc}
      </p>
    </div>
  );
}
