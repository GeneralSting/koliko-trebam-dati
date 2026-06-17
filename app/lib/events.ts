export interface EventType {
  id: string;
  title: string;
  /** Full-bleed background image for the card. */
  image: string;
  /** Solid colour shown behind the image (matches the image's deepest tone). */
  fallback: string;
}

// Hardcoded for now — values/copy will be tuned later from real data + feedback.
export const EVENT_TYPES: EventType[] = [
  {
    id: "obiteljska-slavlja",
    title: "Obiteljska slavlja",
    image: "/cards/obiteljska-slavlja.svg",
    fallback: "#8C3A63",
  },
  {
    id: "godisnjice-jubileji",
    title: "Godišnjice i jubileji",
    image: "/cards/godisnjice-jubileji.svg",
    fallback: "#58101F",
  },
  {
    id: "obrazovanje-karijera",
    title: "Obrazovanje i karijera",
    image: "/cards/obrazovanje-karijera.svg",
    fallback: "#182C5E",
  },
  {
    id: "dogadaji",
    title: "Događaji",
    image: "/cards/dogadaji.svg",
    fallback: "#18564C",
  },
];
