import { EventType, Option } from "../types";
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
    title: "Obrazovanje, posao",
    image: "/cards/obrazovanje-karijera.png",
    fallback: "#182C5E",
  },
  {
    id: "dogadaji",
    title: "Zahvalnice, prekretnice i ostalo",
    image: "/cards/dogadaji.png",
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
    { id: "novi-posao", title: "Novi posao" },
    { id: "promaknuce", title: "Promaknuće" },
    { id: "umirovljenje", title: "Umirovljenje" },
  ],
  dogadaji: [
    { id: "selidba-inozemstvo", title: "Selidba u inozemstvo" },
    { id: "kupnja-nekretnine", title: "Kupnja nekretnine" },
    { id: "useljenje-doma", title: "Useljenje u novi dom" },
    { id: "sprovod", title: "Sprovod" },
    { id: "zahvala-uciteljici", title: "Zahvala učiteljici" },
    { id: "ostalo", title: "Ostalo" },
  ],
};

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
};

// Per-event display overrides where the generic label would be ambiguous — e.g.
// for a birth, "Roditelj" means the new parent's own parent (i.e. the child's
// grandparent), so we spell that out.
const RELATION_TITLE_OVERRIDES: Record<string, Record<string, string>> = {
  "rodenje-djeteta": {
    roditelj: "Roditelj (baka/djed djetetu)",
  },
  krstenje: {
    "baka-djed": "Roditelj (baka/djed)",
  },
};

/** Title for a relationship id, with an optional per-event clarification. */
export function relationTitle(eventId: string, id: string): string {
  return RELATION_TITLE_OVERRIDES[eventId]?.[id] ?? RELATION_TITLES[id] ?? id;
}

/** Relationship options available for a given event, in their authored order. */
export function getRelationOptions(eventId: string): Option[] {
  return Object.keys(RESULTS[eventId] ?? {}).map((id) => ({
    id,
    title: relationTitle(eventId, id),
  }));
}
