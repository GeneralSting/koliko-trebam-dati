/**
 * Builds the email payload for one feedback submission. Structured context
 * (present when sent from the result's "Ne slažem se") lets the email be sorted
 * by event: it drives a descriptive subject and Resend tags, and surfaces the
 * amount the user was disputing. Manual opens carry no context -> generic subject
 */

type FeedbackContext = Record<string, unknown> | null | undefined;

// Resend tag shape (name/value); kept local to avoid a version-specific import
type Tag = { name: string; value: string };

// The request-derived footer lines (not part of the user's message)
type RequestMeta = {
  submittedAt: string;
  referer: string;
  ip: string;
  userAgent: string;
};

type FeedbackEmail = {
  subject: string;
  tags: Tag[] | undefined;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildFeedbackEmail(
  clean: string,
  context: FeedbackContext,
  requestMeta: RequestMeta,
): FeedbackEmail {
  const asString = (value: unknown) => (typeof value === "string" ? value : "");
  const eventTitle = asString(context?.eventTitle);
  const relationTitle = asString(context?.relationTitle);
  const amount = asString(context?.amount);
  const asTag = (value: unknown) =>
    asString(value)
      .replace(/[^A-Za-z0-9_-]/g, "-")
      .slice(0, 256);
  const eventId = asTag(context?.eventId);
  const relationId = asTag(context?.relationId);

  const subject = eventTitle
    ? `Povratna informacija - ${eventTitle}${relationTitle ? ` · ${relationTitle}` : ""}`
    : "Povratna informacija (bez konteksta)";

  const tags: Tag[] | undefined = eventId
    ? [
        { name: "event", value: eventId },
        ...(relationId ? [{ name: "relation", value: relationId }] : []),
      ]
    : undefined;

  const messageBlock = amount
    ? `${clean}\n\nPrikazani iznos: ${amount}`
    : clean;
  const meta = `Vrijeme: ${requestMeta.submittedAt}\nStranica: ${requestMeta.referer}\nIP: ${requestMeta.ip}\nUser-Agent: ${requestMeta.userAgent}`;

  return {
    subject,
    tags,
    text: `${messageBlock}\n\n---\n${meta}`,
    html: `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word">${escapeHtml(
      messageBlock,
    )}</pre><hr><pre style="font:12px/1.5 ui-monospace,monospace;color:#666;white-space:pre-wrap">${escapeHtml(
      meta,
    )}</pre>`,
  };
}
