import { Resend } from "resend";
import type { NextRequest } from "next/server";
import { isRateLimited } from "@/app/lib/feedback/rateLimit";
import { buildFeedbackEmail } from "@/app/lib/feedback/email";

// This endpoint just emails each submission to the site owner, who reviews it by
// hand and updates the hardcoded data. No database, no automation on purpose.

const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 2;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const { message, company, context } = (body ?? {}) as {
    message?: unknown;
    company?: unknown;
    context?: Record<string, unknown> | null;
  };

  // Honeypot: real users never fill the hidden "company" field. Pretend success
  // so bots don't learn they were filtered.
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (
    typeof message !== "string" ||
    message.trim().length < MIN_MESSAGE_LENGTH
  ) {
    return Response.json(
      { ok: false, error: "empty-message" },
      { status: 400 },
    );
  }

  const clean = message.trim().slice(0, MAX_MESSAGE_LENGTH);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO;
  const from =
    process.env.FEEDBACK_FROM ?? "Koliko Trebam Dati <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Misconfiguration — log server-side, don't leak details to the client.
    console.error(
      "Feedback email not configured: set RESEND_API_KEY and FEEDBACK_TO.",
    );
    return Response.json(
      { ok: false, error: "not-configured" },
      { status: 500 },
    );
  }

  const { subject, tags, text, html } = buildFeedbackEmail(clean, context, {
    submittedAt: new Date().toISOString(),
    referer: request.headers.get("referer") ?? "unknown",
    ip,
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html,
    tags,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
