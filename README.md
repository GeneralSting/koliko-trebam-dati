# Koliko trebam dati

A Croatian money-gift calculator: it tells you **how much money to give** for an
occasion, based on your relationship to the recipient — following common Croatian
customs. Live at [kolikodati.com](https://kolikodati.com).

## How it works

The recommendation comes from three choices:

1. **Event type** — a broad category (family celebrations & sacraments,
   birthdays/anniversaries/love, education/work/milestones, thank-yous & social).
2. **Event** — the specific occasion (wedding, baptism, confirmation, funeral, …).
3. **Relationship** — who you are to the recipient (partner, godparent, friend, …).

Given those, the app shows a **recommended amount** plus short contextual notes.
All values are hardcoded, researched figures for Croatia (in `app/lib/results.ts`)
— no database, no user accounts.

Each event and event + relationship pair is a real, statically generated URL
(e.g. `/vjencanje`, `/vjencanje/kum`), so pages are crawlable and indexable for
search. The four top categories are chosen on the home page without changing the
URL; everything deeper is its own page.

**Tech:** Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS v4
(light theme), managed with **pnpm**, deployed on Vercel.

## Feedback email (Resend + Vercel)

Feedback submissions are emailed to the site owner (no database). The owner reads
each message and manually updates the hardcoded data in `app/lib/results.ts`.

**Endpoint:** `POST /api/feedback` ([app/api/feedback/route.ts](app/api/feedback/route.ts))
sends the message via [Resend](https://resend.com). Spam guards: a hidden honeypot
field and a best-effort in-memory rate limit.

### Setup

1. Create a Resend account and an API key: https://resend.com/api-keys
2. Copy `.env.example` → `.env.local` and fill in `RESEND_API_KEY` and `FEEDBACK_TO`.
   - For testing you can leave the sender as the default `onboarding@resend.dev`.
   - For production, verify your domain in Resend and set `FEEDBACK_FROM`.
3. Run `npm run dev` and submit the feedback form to test.

### Deploy (Vercel)

1. Push this repo to GitHub and import it at https://vercel.com (free Hobby plan).
2. In Project → Settings → Environment Variables, add `RESEND_API_KEY`, `FEEDBACK_TO`
   (and optionally `FEEDBACK_FROM`).
3. Deploy. The static pages stay static; `/api/feedback` runs as a serverless function.

### Update loop

Read a feedback email → edit the amounts/notes in `app/lib/results.ts` → commit and
push. Vercel auto-redeploys on push, so no manual deploy step is needed.
