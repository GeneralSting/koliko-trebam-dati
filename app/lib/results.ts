import { GiftResult } from "@/app/types";

/**
 * Hardcoded recommended gift amounts for every event × relationship combination.
 *
 * Amounts are placeholder estimates (EUR, Croatian context) pending real data —
 * tune them freely. Each entry is a recommended amount ready for display plus an
 * optional list of contextual notes. Some combinations show only the amount;
 * others add etiquette notes (e.g. weddings: cover your seat, scale for couples
 * and larger families).
 *
 * Keyed by eventId, then relationId (see EVENTS / RELATIONS in ./events).
 */

// --- Reusable note blocks (shared across the relations of one event) ---

const WEDDING_NOTES = [
  "Dar bi minimalno trebao pokriti cijenu vašeg mjesta na svadbi (couvert) — okvirno 50 – 70 € po osobi.",
  "Ako na vjenčanje idete udvoje, računajte barem dvostruki iznos.",
  "Za veće obitelji (5+ osoba) primjereno je dodatno povećati iznos.",
];

const BIRTH_NOTES = [
  "Uz novac se često daruje i oprema ili odjeća za bebu.",
  "Najbliža rodbina i kumovi obično daruju više.",
];

const CHRISTENING_NOTES = [
  "Kumovi tradicionalno daruju najviše — često zlatnik (dukat) ili veći novčani iznos.",
];

const COMMUNION_NOTES = [
  "Dar se daje djetetu, najčešće kao novac u čestitki.",
  "Kumovi obično daju osjetno veći iznos od ostalih.",
];

const ANNIVERSARY_NOTES = [
  "Za okrugle godišnjice (25., 50.) primjereno je dati više nego inače.",
];

const MILESTONE_NOTES = [
  "Za prekretnice (50, 60, 70…) iznos je obično veći nego za uobičajeni rođendan.",
];

const GRADUATION_NOTES = [
  "Novac kao pomoć za prve korake nakon studija vrlo je dobrodošao.",
];

const PROMOTION_NOTES = [
  "Za promaknuće novac nije uobičajen — češći su simboličan poklon ili čašćenje. Iznos uzmite samo kao okvir.",
];

const RETIREMENT_NOTES = [
  "Za umirovljenje se uz novac često daruje i praktičan ili simboličan poklon.",
];

const HOUSEWARMING_NOTES = [
  "Umjesto novca dobro dođe i praktičan dar za novi dom.",
];

const FUNERAL_NOTES = [
  "Umjesto novca uobičajeni su vijenac, svijeće ili misa za pokojnika.",
  "Novčani prilog daje se diskretno, kao pomoć obitelji oko troškova.",
];

const GENERAL_NOTES = [
  "Iznos prilagodite konkretnoj prigodi i bliskosti s osobom.",
];

// Extra note for colleagues, who commonly pool money into a single envelope.
const COLLEAGUE_POOL =
  "Kolege često skupljaju za zajednički dar u zajedničku kuvertu.";

export const RESULTS: Record<string, Record<string, GiftResult>> = {
  // --- Obiteljska slavlja ---
  vjencanje: {
    roditelj: { amount: "300 – 500 €", notes: WEDDING_NOTES },
    "brat-sestra": { amount: "200 – 300 €", notes: WEDDING_NOTES },
    rodak: { amount: "100 – 150 €", notes: WEDDING_NOTES },
    prijatelj: { amount: "100 – 150 €", notes: WEDDING_NOTES },
    kolega: { amount: "70 – 100 €", notes: WEDDING_NOTES },
    susjed: { amount: "50 – 80 €", notes: WEDDING_NOTES },
    poznanik: { amount: "50 €", notes: WEDDING_NOTES },
  },
  "rodenje-djeteta": {
    roditelj: { amount: "150 – 300 €", notes: BIRTH_NOTES },
    "brat-sestra": { amount: "100 – 150 €", notes: BIRTH_NOTES },
    rodak: { amount: "50 – 80 €", notes: BIRTH_NOTES },
    prijatelj: { amount: "50 – 80 €", notes: BIRTH_NOTES },
    kolega: { amount: "30 – 50 €", notes: BIRTH_NOTES },
    susjed: { amount: "20 – 30 €", notes: BIRTH_NOTES },
    poznanik: { amount: "20 €", notes: BIRTH_NOTES },
  },
  krstenje: {
    roditelj: { amount: "100 – 200 €", notes: CHRISTENING_NOTES },
    "brat-sestra": { amount: "50 – 100 €", notes: CHRISTENING_NOTES },
    rodak: { amount: "30 – 50 €", notes: CHRISTENING_NOTES },
    prijatelj: { amount: "30 – 50 €", notes: CHRISTENING_NOTES },
    kolega: { amount: "20 – 30 €", notes: CHRISTENING_NOTES },
    susjed: { amount: "20 €", notes: CHRISTENING_NOTES },
    poznanik: { amount: "20 €", notes: CHRISTENING_NOTES },
  },
  "prva-pricest": {
    roditelj: { amount: "50 – 100 €", notes: COMMUNION_NOTES },
    "brat-sestra": { amount: "30 – 50 €", notes: COMMUNION_NOTES },
    rodak: { amount: "20 – 50 €", notes: COMMUNION_NOTES },
    prijatelj: { amount: "20 – 30 €", notes: COMMUNION_NOTES },
    kolega: { amount: "20 €", notes: COMMUNION_NOTES },
    susjed: { amount: "10 – 20 €", notes: COMMUNION_NOTES },
    poznanik: { amount: "10 – 20 €", notes: COMMUNION_NOTES },
  },
  rodendan: {
    roditelj: { amount: "50 – 100 €" },
    "brat-sestra": { amount: "30 – 50 €" },
    rodak: { amount: "20 – 30 €" },
    prijatelj: { amount: "20 – 50 €" },
    kolega: { amount: "10 – 20 €" },
    susjed: { amount: "10 – 20 €" },
    poznanik: { amount: "10 €" },
  },

  // --- Godišnjice i jubileji ---
  "godisnjica-braka": {
    roditelj: { amount: "50 – 100 €", notes: ANNIVERSARY_NOTES },
    "brat-sestra": { amount: "30 – 50 €", notes: ANNIVERSARY_NOTES },
    rodak: { amount: "20 – 50 €", notes: ANNIVERSARY_NOTES },
    prijatelj: { amount: "30 – 50 €", notes: ANNIVERSARY_NOTES },
    kolega: { amount: "20 – 30 €", notes: ANNIVERSARY_NOTES },
    susjed: { amount: "20 €", notes: ANNIVERSARY_NOTES },
    poznanik: { amount: "20 €", notes: ANNIVERSARY_NOTES },
  },
  "okrugli-rodendan": {
    roditelj: { amount: "50 – 150 €", notes: MILESTONE_NOTES },
    "brat-sestra": { amount: "50 – 100 €", notes: MILESTONE_NOTES },
    rodak: { amount: "30 – 50 €", notes: MILESTONE_NOTES },
    prijatelj: { amount: "30 – 50 €", notes: MILESTONE_NOTES },
    kolega: { amount: "20 – 30 €", notes: [...MILESTONE_NOTES, COLLEAGUE_POOL] },
    susjed: { amount: "20 €", notes: MILESTONE_NOTES },
    poznanik: { amount: "10 – 20 €", notes: MILESTONE_NOTES },
  },
  obljetnica: {
    roditelj: { amount: "30 – 50 €" },
    "brat-sestra": { amount: "20 – 50 €" },
    rodak: { amount: "20 – 30 €" },
    prijatelj: { amount: "20 – 30 €" },
    kolega: { amount: "10 – 20 €" },
    susjed: { amount: "10 – 20 €" },
    poznanik: { amount: "10 €" },
  },

  // --- Obrazovanje i karijera ---
  diploma: {
    roditelj: { amount: "100 – 200 €", notes: GRADUATION_NOTES },
    "brat-sestra": { amount: "50 – 100 €", notes: GRADUATION_NOTES },
    rodak: { amount: "30 – 50 €", notes: GRADUATION_NOTES },
    prijatelj: { amount: "30 – 50 €", notes: GRADUATION_NOTES },
    kolega: { amount: "20 – 30 €", notes: GRADUATION_NOTES },
    susjed: { amount: "20 €", notes: GRADUATION_NOTES },
    poznanik: { amount: "10 – 20 €", notes: GRADUATION_NOTES },
  },
  maturalna: {
    roditelj: { amount: "50 – 100 €" },
    "brat-sestra": { amount: "30 – 50 €" },
    rodak: { amount: "20 – 30 €" },
    prijatelj: { amount: "20 – 30 €" },
    kolega: { amount: "10 – 20 €" },
    susjed: { amount: "10 – 20 €" },
    poznanik: { amount: "10 €" },
  },
  promaknuce: {
    roditelj: { amount: "20 – 50 €", notes: PROMOTION_NOTES },
    "brat-sestra": { amount: "20 – 30 €", notes: PROMOTION_NOTES },
    rodak: { amount: "10 – 20 €", notes: PROMOTION_NOTES },
    prijatelj: { amount: "20 – 30 €", notes: PROMOTION_NOTES },
    kolega: { amount: "10 – 20 €", notes: [...PROMOTION_NOTES, COLLEAGUE_POOL] },
    susjed: { amount: "10 €", notes: PROMOTION_NOTES },
    poznanik: { amount: "10 €", notes: PROMOTION_NOTES },
  },
  umirovljenje: {
    roditelj: { amount: "30 – 50 €", notes: RETIREMENT_NOTES },
    "brat-sestra": { amount: "20 – 50 €", notes: RETIREMENT_NOTES },
    rodak: { amount: "20 – 30 €", notes: RETIREMENT_NOTES },
    prijatelj: { amount: "20 – 30 €", notes: RETIREMENT_NOTES },
    kolega: { amount: "10 – 20 €", notes: [...RETIREMENT_NOTES, COLLEAGUE_POOL] },
    susjed: { amount: "10 – 20 €", notes: RETIREMENT_NOTES },
    poznanik: { amount: "10 €", notes: RETIREMENT_NOTES },
  },

  // --- Događaji ---
  useljenje: {
    roditelj: { amount: "50 – 150 €", notes: HOUSEWARMING_NOTES },
    "brat-sestra": { amount: "50 – 100 €", notes: HOUSEWARMING_NOTES },
    rodak: { amount: "30 – 50 €", notes: HOUSEWARMING_NOTES },
    prijatelj: { amount: "30 – 50 €", notes: HOUSEWARMING_NOTES },
    kolega: { amount: "20 – 30 €", notes: HOUSEWARMING_NOTES },
    susjed: { amount: "20 – 30 €", notes: HOUSEWARMING_NOTES },
    poznanik: { amount: "20 €", notes: HOUSEWARMING_NOTES },
  },
  sprovod: {
    roditelj: { amount: "50 – 100 €", notes: FUNERAL_NOTES },
    "brat-sestra": { amount: "30 – 50 €", notes: FUNERAL_NOTES },
    rodak: { amount: "20 – 50 €", notes: FUNERAL_NOTES },
    prijatelj: { amount: "20 – 50 €", notes: FUNERAL_NOTES },
    kolega: { amount: "20 – 30 €", notes: FUNERAL_NOTES },
    susjed: { amount: "20 €", notes: FUNERAL_NOTES },
    poznanik: { amount: "10 – 20 €", notes: FUNERAL_NOTES },
  },
  ostalo: {
    roditelj: { amount: "30 – 50 €", notes: GENERAL_NOTES },
    "brat-sestra": { amount: "20 – 30 €", notes: GENERAL_NOTES },
    rodak: { amount: "20 €", notes: GENERAL_NOTES },
    prijatelj: { amount: "20 – 30 €", notes: GENERAL_NOTES },
    kolega: { amount: "10 – 20 €", notes: GENERAL_NOTES },
    susjed: { amount: "10 – 20 €", notes: GENERAL_NOTES },
    poznanik: { amount: "10 €", notes: GENERAL_NOTES },
  },
};

// Safe fallback so the result step always has something to show.
const DEFAULT_RESULT: GiftResult = { amount: "20 – 50 €", notes: GENERAL_NOTES };

/** Look up the recommended result for a given event + relationship combination. */
export function getResult(eventId: string, relationId: string): GiftResult {
  return RESULTS[eventId]?.[relationId] ?? DEFAULT_RESULT;
}
