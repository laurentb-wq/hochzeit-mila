import Filmstrips from "./components/Filmstrips";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Filmstrips />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(1.5rem, 6vw, 3.5rem)",
          background:
            "radial-gradient(ellipse 62% 54% at center, rgba(234,237,218,0.92) 0%, rgba(234,237,218,0.72) 45%, rgba(234,237,218,0) 78%)",
        }}
      >
        <p style={{ fontSize: "0.875rem", fontWeight: 300, color: "#74825A", marginBottom: "1rem" }}>
          Schön wart ihr mit dabei. Danke für alles.
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1E2614", marginBottom: "0.75rem" }}>
          Mirjam &amp; Laurent
        </h1>
        <p style={{ fontSize: "1.125rem", fontWeight: 300, color: "#74825A", marginBottom: "2rem" }}>
          14. August 2026 · Zehendermätteli · Bern
        </p>
        <a
          href="https://drive.google.com/drive/folders/1PAc5HXgqXWm_xuPDPMEHPi32hJu9i9LT?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#5C6B3A",
            color: "white",
            borderRadius: 999,
            padding: "10px 24px",
            fontSize: "0.875rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textDecoration: "none",
          }}
        >
          Zu den Fotos
        </a>
      </div>
    </div>
  );
}
