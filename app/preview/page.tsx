const OLIVE = "#5C6B3A";
const OLIVE_LIGHT = "#EAEDDA";
const MUTED = "#74825A";
const DARK = "#1E2614";
const BORDER = "#CDD5B0";

export default function PreviewPage() {
  return (
    <div style={{ background: "#F5F7EE", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "40px 24px" }}>
      <p style={{ textAlign: "center", color: OLIVE, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Vorschau</p>
      <h1 style={{ textAlign: "center", color: DARK, fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Header & Footer — 3 Varianten</h1>
      <p style={{ textAlign: "center", color: MUTED, fontSize: 13, marginBottom: 60 }}>Wähle deinen Favoriten</p>

      {/* ══ OPTION A ══ */}
      <section style={{ marginBottom: 80 }}>
        <Label>Option A — Dunkel & Edel</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 28 }}>
          Header und Footer in tiefem Waldgrün (#1E2614) mit hellem Text — klassisch, elegant, kontrastreich
        </p>

        {/* NAV A */}
        <div style={{ maxWidth: 720, margin: "0 auto 6px" }}>
          <div style={{
            background: "#1E2614",
            borderRadius: "16px 16px 0 0",
            padding: "0 28px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ color: "#CDD5B0", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em" }}>MILA</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Programm", "Dresscode", "Anreise", "Anmeldung"].map(l => (
                <span key={l} style={{ color: "rgba(205,213,176,0.7)", fontSize: 13 }}>{l}</span>
              ))}
            </div>
            <div style={{ background: "#5C6B3A", color: "white", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 999 }}>
              Anmelden
            </div>
          </div>

          {/* Hero preview */}
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}` }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>das wollen wir feiern!</p>
            <p style={{ color: MUTED, fontSize: 12 }}>14. August 2026 · Zehendermätteli · Bern</p>
          </div>

          {/* Footer A */}
          <div style={{
            background: "#1E2614",
            borderRadius: "0 0 16px 16px",
            padding: "36px 28px",
            textAlign: "center",
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
                <div key={i} style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", opacity: 0.85 }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <p style={{ color: "#CDD5B0", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Mirjam & Laurent</p>
            <p style={{ color: "rgba(205,213,176,0.55)", fontSize: 12 }}>14. August 2026 · Zehendermätteli im Glück, Bern</p>
            <p style={{ color: "rgba(205,213,176,0.3)", fontSize: 11, marginTop: 16 }}>Made with 💚</p>
          </div>
        </div>
      </section>

      {/* ══ OPTION B ══ */}
      <section style={{ marginBottom: 80 }}>
        <Label>Option B — Transparent & Minimal</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 28 }}>
          Nav fast unsichtbar (nur Unterline), Footer offen ohne Box — alles fusioniert mit dem Seitenhintergrund
        </p>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* NAV B */}
          <div style={{
            background: "rgba(234,237,218,0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "16px 16px 0 0",
            borderBottom: `1.5px solid ${BORDER}`,
            padding: "0 28px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ color: OLIVE, fontWeight: 800, fontSize: 15, letterSpacing: "0.05em" }}>MILA</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Programm", "Dresscode", "Anreise", "Anmeldung"].map(l => (
                <span key={l} style={{ color: MUTED, fontSize: 13 }}>{l}</span>
              ))}
            </div>
            <div style={{ border: `1.5px solid ${OLIVE}`, color: OLIVE, fontSize: 12, fontWeight: 600, padding: "5px 16px", borderRadius: 999 }}>
              Anmelden
            </div>
          </div>

          {/* Hero preview */}
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}`, borderTop: "none" }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>das wollen wir feiern!</p>
            <p style={{ color: MUTED, fontSize: 12 }}>14. August 2026 · Zehendermätteli · Bern</p>
          </div>

          {/* Footer B */}
          <div style={{
            background: "transparent",
            borderTop: `1px solid ${BORDER}`,
            borderRadius: "0 0 16px 16px",
            padding: "40px 28px",
            textAlign: "center",
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
                <div key={i} style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <p style={{ color: DARK, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Mirjam & Laurent</p>
            <p style={{ color: MUTED, fontSize: 12 }}>14. August 2026 · Zehendermätteli im Glück, Bern</p>
            <p style={{ color: "#A0AA80", fontSize: 11, marginTop: 16 }}>Made with 💚</p>
          </div>
        </div>
      </section>

      {/* ══ OPTION C ══ */}
      <section style={{ marginBottom: 40 }}>
        <Label>Option C — Olive Banner mit Goldakzent</Label>
        <p style={{ color: MUTED, fontSize: 13, textAlign: "center", marginBottom: 28 }}>
          Nav als breites Olive-Band mit Goldtext, Footer als warmes Olive-Panel mit goldener Trennlinie
        </p>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* NAV C */}
          <div style={{
            background: "#5C6B3A",
            borderRadius: "16px 16px 0 0",
            padding: "0 28px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ color: "#D4BE78", fontWeight: 800, fontSize: 15, letterSpacing: "0.12em" }}>MILA</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Programm", "Dresscode", "Anreise", "Anmeldung"].map(l => (
                <span key={l} style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{l}</span>
              ))}
            </div>
            <div style={{ background: "#D4BE78", color: "#1E2614", fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 999 }}>
              Anmelden
            </div>
          </div>

          {/* Hero preview */}
          <div style={{ background: OLIVE_LIGHT, padding: "32px 28px", textAlign: "center", border: `1px solid ${BORDER}`, borderTop: "none" }}>
            <p style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>Wir haben den nächsten Schritt gewagt und 💍</p>
            <p style={{ color: DARK, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>das wollen wir feiern!</p>
            <p style={{ color: MUTED, fontSize: 12 }}>14. August 2026 · Zehendermätteli · Bern</p>
          </div>

          {/* Footer C */}
          <div style={{
            background: "#5C6B3A",
            borderRadius: "0 0 16px 16px",
            padding: "36px 28px",
            textAlign: "center",
          }}>
            {/* Gold divider */}
            <div style={{ width: 40, height: 1.5, background: "#D4BE78", margin: "0 auto 20px" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
                <div key={i} style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", border: "2px solid rgba(212,190,120,0.4)" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <p style={{ color: "#D4BE78", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Mirjam & Laurent</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>14. August 2026 · Zehendermätteli im Glück, Bern</p>
            <p style={{ color: "rgba(212,190,120,0.4)", fontSize: 11, marginTop: 16 }}>Made with 💚</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ flex: 1, height: 1, background: "#CDD5B0" }} />
      <p style={{ color: "#5C6B3A", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</p>
      <div style={{ flex: 1, height: 1, background: "#CDD5B0" }} />
    </div>
  );
}
