// Single source of truth for the site's public identity + canonical base URL.
function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveBaseUrl();
export const SITE_NAME = "Koliko Trebam Dati?";
export const SITE_DESCRIPTION =
  "Brzo saznajte preporučeni iznos novčanog poklona ovisno o prigodi i vašem odnosu s primateljem, prilagođen hrvatskim običajima.";
