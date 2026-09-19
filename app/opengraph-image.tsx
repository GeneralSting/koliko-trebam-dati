import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "./lib/site";

// Rendered at build time. Linked from every page's og:image via SHARED_OPEN_GRAPH
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Theme tokens mirrored from globals.css (ImageResponse can't read CSS vars)
const PAPER = "#f8f6f2";
const INK = "#1b1b1f";
const MUTED = "#6e6e76";
const ACCENT = "#15794a";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "56px",
        background: PAPER,
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "78px",
            fontWeight: 800,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Koliko trebam dati?
        </div>
        <div
          style={{
            fontSize: "34px",
            color: MUTED,
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Preporučeni iznos novčanog poklona - prema prigodi i vašem odnosu s
          primateljem.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "10px",
          width: "180px",
          borderRadius: "999px",
          background: ACCENT,
        }}
      />
    </div>,
    { ...size },
  );
}
