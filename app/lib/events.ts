import { EventType, Option } from "../types";

export const EVENT_TYPES: EventType[] = [
  {
    id: "obiteljska-slavlja",
    title: "Obiteljska slavlja",
    image: "/cards/obiteljska-slavlja.png",
    fallback: "#8C3A63",
  },
  {
    id: "godisnjice-jubileji",
    title: "Godišnjice i jubileji",
    image: "/cards/godisnjice-jubileji.png",
    fallback: "#58101F",
  },
  {
    id: "obrazovanje-karijera",
    title: "Obrazovanje i karijera",
    image: "/cards/obrazovanje-karijera.png",
    fallback: "#182C5E",
  },
  {
    id: "dogadaji",
    title: "Događaji",
    image: "/cards/dogadaji.png",
    fallback: "#18564C",
  },
];

export const EVENTS: Record<string, Option[]> = {
  "obiteljska-slavlja": [
    { id: "vjencanje", title: "Vjenčanje" },
    { id: "rodenje-djeteta", title: "Rođenje djeteta" },
    { id: "krstenje", title: "Krštenje" },
    { id: "prva-pricest", title: "Prva pričest" },
    { id: "rodendan", title: "Rođendan" },
  ],
  "godisnjice-jubileji": [
    { id: "godisnjica-braka", title: "Godišnjica braka" },
    { id: "okrugli-rodendan", title: "Okrugli rođendan" },
    { id: "obljetnica", title: "Obljetnica" },
  ],
  "obrazovanje-karijera": [
    { id: "diploma", title: "Diploma" },
    { id: "maturalna", title: "Maturalna večer" },
    { id: "promaknuce", title: "Promaknuće" },
    { id: "umirovljenje", title: "Umirovljenje" },
  ],
  dogadaji: [
    { id: "useljenje", title: "Useljenje" },
    { id: "sprovod", title: "Sprovod" },
    { id: "ostalo", title: "Ostalo" },
  ],
};

// Step 3 — your relationship to the recipient (placeholder data).
export const RELATIONS: Option[] = [
  { id: "roditelj", title: "Roditelj" },
  { id: "brat-sestra", title: "Brat ili sestra" },
  { id: "rodak", title: "Rođak ili rođakinja" },
  { id: "prijatelj", title: "Prijatelj" },
  { id: "kolega", title: "Kolega" },
  { id: "susjed", title: "Susjed" },
  { id: "poznanik", title: "Poznanik" },
];
