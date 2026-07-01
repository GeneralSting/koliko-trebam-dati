import { Resend } from "resend";
import type { NextRequest } from "next/server";

// This endpoint just emails each submission to the site owner, who reviews it by
// hand and updates the hardcoded data. No database, no automation on purpose.

const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 2;

// Best-effort in-memory rate limit. On serverless this only sees a single warm
// instance, so it's a speed bump against bursts — the honeypot is the real
// spam guard (add Cloudflare Turnstile later if abuse becomes a problem).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const { message, company } = (body ?? {}) as {
    message?: unknown;
    company?: unknown;
  };

  // Honeypot: real users never fill the hidden "company" field. Pretend success
  // so bots don't learn they were filtered.
  if (typeof company === "string" && company.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof message !== "string" || message.trim().length < MIN_MESSAGE_LENGTH) {
    return Response.json({ ok: false, error: "empty-message" }, { status: 400 });
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
    process.env.FEEDBACK_FROM ??
    "Koliko Trebam Dati <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Misconfiguration — log server-side, don't leak details to the client.
    console.error("Feedback email not configured: set RESEND_API_KEY and FEEDBACK_TO.");
    return Response.json({ ok: false, error: "not-configured" }, { status: 500 });
  }

  const submittedAt = new Date().toISOString();
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const referer = request.headers.get("referer") ?? "unknown";

  const meta = `Vrijeme: ${submittedAt}\nStranica: ${referer}\nIP: ${ip}\nUser-Agent: ${userAgent}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: "Nova povratna informacija — Koliko Trebam Dati?",
    text: `${clean}\n\n---\n${meta}`,
    html: `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word">${escapeHtml(
      clean,
    )}</pre><hr><pre style="font:12px/1.5 ui-monospace,monospace;color:#666;white-space:pre-wrap">${escapeHtml(
      meta,
    )}</pre>`,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
