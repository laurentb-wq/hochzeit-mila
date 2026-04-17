const OLIVE = "#5C6B3A";
const OLIVE_LIGHT = "#EAEDDA";
const MUTED = "#74825A";
const DARK = "#1E2614";
const BORDER = "#CDD5B0";

const LINKS = ["Programm", "Dresscode", "Anreise", "Anmeldung"];

export default function PreviewPage() {
  return (
    <div style={{ background: "#F5F7EE", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "40px 24px" }}>
      <p style={{ textAlign: "center", color: OLIVE, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Vorschau</p>
      <h1 style={{ textAlign: "center", color: DARK, fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Nav-Idee — 3 Varianten</h1>
      <p style={{ textAlign: "center", color: MUTED, fontSize: 13, marginBottom: 60 }}>Nav wie Body, 4 Buttons zentriert, kein Anmelden-Button</p>

      {/* ── VARIANTE 1: Pill Buttons ── */}
      <section style={{ marginBottom: 64 }}>
        <Label>Variante 1 — Pill Buttons</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Gefüllte Pillen mit Olive-Hintergrund</p>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: OLIVE_LIGHT,
            borderBottom: `1px solid ${BORDER}`,
            borderRadius: "16px 16px 0 0",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}>
            {LINKS.map(l => (
              <div key={l} style={{
                background: "white",
                border: `1px solid ${BORDER}`,
                color: DARK,
                fontSize: 12,
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: 999,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(92,107,58,0.08)",
              }}>{l}</div>
            ))}
          </div>
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 16px 16px" }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800 }}>das wollen wir feiern!</p>
          </div>
        </div>
      </section>

      {/* ── VARIANTE 2: Underline Tabs ── */}
      <section style={{ marginBottom: 64 }}>
        <Label>Variante 2 — Underline Tabs</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Schlichte Text-Links mit Olive-Unterstrich beim Hover</p>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: OLIVE_LIGHT,
            borderBottom: `2px solid ${BORDER}`,
            borderRadius: "16px 16px 0 0",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}>
            {LINKS.map((l, i) => (
              <div key={l} style={{
                color: i === 0 ? OLIVE : MUTED,
                fontSize: 13,
                fontWeight: i === 0 ? 700 : 500,
                paddingBottom: 4,
                borderBottom: i === 0 ? `2px solid ${OLIVE}` : "2px solid transparent",
                cursor: "pointer",
              }}>{l}</div>
            ))}
          </div>
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 16px 16px" }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800 }}>das wollen wir feiern!</p>
          </div>
        </div>
      </section>

      {/* ── VARIANTE 3: Outlined Buttons mit Icon ── */}
      <section style={{ marginBottom: 40 }}>
        <Label>Variante 3 — Outlined mit Olive-Akzent</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Outlined Buttons, aktiver Zustand gefüllt in Olive mit weissem Text</p>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            background: OLIVE_LIGHT,
            borderBottom: `1px solid ${BORDER}`,
            borderRadius: "16px 16px 0 0",
            padding: "0 24px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}>
            {LINKS.map((l, i) => (
              <div key={l} style={{
                background: i === 0 ? OLIVE : "transparent",
                border: `1.5px solid ${i === 0 ? OLIVE : BORDER}`,
                color: i === 0 ? "white" : MUTED,
                fontSize: 12,
                fontWeight: 600,
                padding: "7px 18px",
                borderRadius: 10,
                cursor: "pointer",
              }}>{l}</div>
            ))}
          </div>
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 16px 16px" }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800 }}>das wollen wir feiern!</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, background: BORDER }} />
      <p style={{ color: OLIVE, fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</p>
      <div style={{ flex: 1, height: 1, background: BORDER }} />
    </div>
  );
}
