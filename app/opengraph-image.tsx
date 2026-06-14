import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mirjam & Laurent — 14. August 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#EAEDDA",
          gap: 32,
        }}
      >
        <svg viewBox="0 0 100 100" width="180" height="180">
          <path
            d="M50 82 C48 80 10 56 10 33 C10 18 21 8 35 8 C42 8 48 12 50 17 C52 12 58 8 65 8 C79 8 90 18 90 33 C90 56 52 80 50 82Z"
            fill="#5C6B3A"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 52, fontWeight: 700, color: "#1E2614", letterSpacing: "-0.02em" }}>
            Mirjam & Laurent
          </div>
          <div style={{ fontSize: 28, color: "#74825A", letterSpacing: "0.05em" }}>
            14. August 2026
          </div>
        </div>
      </div>
    ),
    size,
  );
}
