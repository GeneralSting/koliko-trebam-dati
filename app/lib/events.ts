import { EventEntry, EventType, Option } from "../types";
import { RESULTS } from "./results";

export const EVENT_TYPES: EventType[] = [
  {
    id: "obiteljska-slavlja",
    title: "Obiteljska slavlja i sakramenti",
    image: "/cards/obiteljska-slavlja.png",
    fallback: "#8C3A63",
  },
  {
    id: "godisnjice-jubileji",
    title: "Rođendani, godišnjice i ljubav",
    image: "/cards/godisnjice-jubileji.png",
    fallback: "#58101F",
  },
  {
    id: "obrazovanje-karijera",
    title: "Obrazovanje i posao",
    image: "/cards/obrazovanje-karijera.png",
    fallback: "#182C5E",
  },
  {
    id: "dogadaji",
    title: "Zahvalnice, prekretnice i ostalo",
    image: "/cards/zahvalnice-prekretnice-ostalo.png",
    fallback: "#18564C",
  },
];

export const EVENTS: Record<string, Option[]> = {
  "obiteljska-slavlja": [
    { id: "vjencanje", title: "Vjenčanje" },
    { id: "rodenje-djeteta", title: "Rođenje djeteta (babinje)" },
    { id: "krstenje", title: "Krštenje" },
    { id: "prva-pricest", title: "Prva pričest" },
    { id: "krizma", title: "Krizma" },
    { id: "mlada-misa", title: "Mlada misa" },
    { id: "zaruke", title: "Zaruke" },
    { id: "useljenje-partnera", title: "Useljenje s partnerom" },
  ],
  "godisnjice-jubileji": [
    { id: "rodendan", title: "Rođendan" },
    { id: "rodendan-djecji", title: "Dječji rođendan" },
    { id: "prvi-rodendan", title: "Prvi rođendan" },
    { id: "godisnjica-braka", title: "Godišnjica braka" },
    { id: "godisnjica-veze", title: "Godišnjica veze" },
    { id: "valentinovo", title: "Valentinovo" },
    { id: "bozic", title: "Božić" },
    { id: "uskrs", title: "Uskrs" },
  ],
  "obrazovanje-karijera": [
    { id: "zavrsetak-osnovne", title: "Završetak osnovne škole" },
    { id: "zavrsetak-srednje", title: "Završetak srednje škole" },
    { id: "maturalna-zabava", title: "Maturalna zabava" },
    { id: "upis-fakultet", title: "Upis na fakultet" },
    { id: "diploma", title: "Diploma" },
    { id: "promaknuce", title: "Promaknuće" },
    { id: "umirovljenje", title: "Umirovljenje" },
  ],
  dogadaji: [
    { id: "selidba-inozemstvo", title: "Selidba u inozemstvo" },
    { id: "kupnja-nekretnine", title: "Kupnja nekretnine" },
    { id: "useljenje-doma", title: "Useljenje u novi dom" },
    { id: "blagoslov-kuce", title: "Blagoslov kuće / stana" },
    { id: "zahvala-uciteljici", title: "Zahvala učiteljici" },
    { id: "sprovod", title: "Sprovod" },
    { id: "ostalo", title: "Ostalo" },
  ],
};

// Every event flattened with its category, for the global event search.
export const ALL_EVENTS: EventEntry[] = EVENT_TYPES.flatMap((type) =>
  (EVENTS[type.id] ?? []).map((event) => ({
    ...event,
    typeId: type.id,
    typeTitle: type.title,
  })),
);

// Fold Croatian diacritics so "rodendan" matches "Rođendan", "vjencanje" → "Vjenčanje", etc.
const foldDiacritics = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents (č→c, ž→z, …)
    .replace(/đ/g, "d"); // đ has no NFD decomposition

/** Search across all events (any category) by title; empty query → no results. */
export function searchEvents(query: string): EventEntry[] {
  const normalizedQuery = foldDiacritics(query.trim());
  if (!normalizedQuery) return [];
  return ALL_EVENTS.filter((event) =>
    foldDiacritics(event.title).includes(normalizedQuery),
  );
}

// Step 3 — your relationship to the recipient. The available relationships
// depend on the chosen event and are derived from RESULTS; this map provides the
// display title for every relationship id used there.
export const RELATION_TITLES: Record<string, string> = {
  partner: "Partner",
  roditelj: "Roditelj",
  "baka-djed": "Baka / djed",
  dijete: "Dijete",
  unuce: "Unuče",
  "brat-sestra": "Brat / sestra",
  kum: "Kum / kuma",
  rodak: "Rođak / rođakinja",
  prijatelj: "Prijatelj",
  kolega: "Kolega",
  susjed: "Susjed",
  poznanik: "Poznanik",
  obitelj: "Obitelj",
  "skupno-razred": "Cijeli razred (zajednički)",
  svecenik: "Svećenik / ministranti",
};

// Per-event display overrides where the generic label would be ambiguous — e.g.
// for a birth, "Roditelj" means the new parent's own parent (i.e. the child's
// grandparent), so we spell that out.
const RELATION_TITLE_OVERRIDES: Record<string, Record<string, string>> = {
  "rodenje-djeteta": {
    roditelj: "Roditelj (baka / djed djetetu)",
  },
  krstenje: {
    "baka-djed": "Roditelj (baka / djed)",
  },
};

/** Title for a relationship id, with an optional per-event clarification. */
export function relationTitle(eventId: string, relationId: string): string {
  return (
    RELATION_TITLE_OVERRIDES[eventId]?.[relationId] ??
    RELATION_TITLES[relationId] ??
    relationId
  );
}

/** Relationship options available for a given event, in their authored order. */
export function getRelationOptions(eventId: string): Option[] {
  return Object.keys(RESULTS[eventId] ?? {}).map((relationId) => ({
    id: relationId,
    title: relationTitle(eventId, relationId),
  }));
}

/** Full entry (title + category) for an event id — used by the event route pages. */
export function getEventMeta(eventId: string): EventEntry | undefined {
  return ALL_EVENTS.find((event) => event.id === eventId);
}

// Every valid event + relationship pair, for statically generating the
// combination pages (`/[event]/[relation]`) and listing them in the sitemap.
export const ALL_EVENT_RELATIONS: { event: string; relation: string }[] =
  Object.entries(RESULTS).flatMap(([event, relations]) =>
    Object.keys(relations).map((relation) => ({ event, relation })),
  );
