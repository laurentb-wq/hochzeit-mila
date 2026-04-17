"use client";
import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";
import RsvpForm from "./RsvpForm";

const ACCENT = "#5C6B3A";
const MUTED = "#74825A";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center space-y-2 mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{label}</p>
      <h2 className="text-3xl font-bold" style={{ color: "#1E2614" }}>{title}</h2>
      <div className="mx-auto mt-3 w-10 h-0.5 rounded-full" style={{ background: ACCENT }} />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#CDD5B0] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#5C6B3A]/10 hover:border-[#5C6B3A]/30 ${className}`}>
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Programm", idx: 1 },
  { label: "Dresscode", idx: 2 },
  { label: "Anreise", idx: 3 },
  { label: "Anmeldung", idx: 4 },
];

const SECTION_COUNT = 5;
const NAV_H = 64;

export default function FullPageLayout() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sectionRefs.current.findIndex(r => r === e.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  function scrollTo(i: number) {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  }

  const sectionStyle: React.CSSProperties = {
    height: "100svh",
    minHeight: "-webkit-fill-available",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    paddingTop: NAV_H,
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "#1E2614", height: NAV_H }}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <span />
          <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm">
            {NAV_LINKS.map(({ label, idx }) => {
              const isActive = active === idx;
              return (
                <button key={label} onClick={() => scrollTo(idx)} style={{
                  color: isActive ? "#CDD5B0" : "rgba(205,213,176,0.5)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "inherit", fontWeight: isActive ? 700 : 400,
                  padding: "4px 0",
                  borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                  transition: "all 0.3s ease",
                }}>
                  {label}
                </button>
              );
            })}
          </div>
          <span />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={el => { sectionRefs.current[0] = el; }} style={sectionStyle}>
        <div className="flex flex-col items-center justify-center text-center px-6 py-10 flex-1">
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md" style={{ width: "clamp(80px, 25vw, 135px)", height: "clamp(80px, 25vw, 135px)" }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm mb-4 font-light" style={{ color: MUTED }}>Wir haben den nächsten Schritt gewagt und 💍</p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-3" style={{ color: "#1E2614" }}>das wollen wir feiern!</h1>
          <p className="text-lg font-light mb-8" style={{ color: MUTED }}>14. August 2026 · Zehendermätteli · Bern</p>
          <Countdown />
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full">
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">📅</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Datum</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>14. August 2026</p>
              <p className="text-sm flex-1" style={{ color: MUTED }}>Ab ca. 15:30 Uhr bis die Sterne zählen</p>
            </Card>
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">📍</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Location</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>Zehendermätteli</p>
              <p className="text-sm flex-1" style={{ color: MUTED }}>Reichenbachstrasse 161, 3004 Bern</p>
              <a href="https://maps.google.com/?q=Reichenbachstrasse+161+3004+Bern" target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold hover:opacity-70 transition-opacity mt-auto" style={{ color: ACCENT }}>Google Maps →</a>
            </Card>
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">📋</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Anmeldung</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>Bis 1. Juli 2026</p>
              <p className="text-sm flex-1" style={{ color: MUTED }}>Damit die Küche weiss, wie viele Teller sie aufwärmen soll.</p>
              <button onClick={() => scrollTo(4)} className="inline-block text-sm font-semibold hover:opacity-70 transition-opacity mt-auto text-left" style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer" }}>Jetzt anmelden →</button>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PROGRAMM ── */}
      <section ref={el => { sectionRefs.current[1] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Der grosse Tag" title="Programm" />
            <div className="space-y-3">
              {[
                { time: "15:30", icon: "👋", title: "Eintreffen & Ankommen", desc: "Komm pünktlich, such dir einen guten Platz und tu so, als hättest du die Location schon immer gekannt. Sekt steht bereit." },
                { time: "16:00", icon: "💍", title: "Startschuss & Spalier stehen", desc: "Jetzt wird's ernst. Spalier aufstellen, Konfetti bereithalten, Taschentücher nicht vergessen. Handy auf stumm — wirklich." },
                { time: "18:30", icon: "🍽️", title: "Abendessen", desc: "Endlich. Das Warten hat sich gelohnt. Mehrere Gänge, gutes Essen, noch bessere Gesellschaft. Wer jetzt noch nüchtern redet, hat selbst schuld." },
                { time: "21:30", icon: "🍰", title: "Dessert", desc: "Der süsse Höhepunkt des Abends — ausser natürlich dem Jawort. Torte, Glück und Zuckerschock inklusive." },
                { time: "01:00", icon: "🎶", title: "Letzte Runde", desc: "Die Beine schmerzen, die Stimme ist heiser — und trotzdem will niemand gehen. Noch ein Tanz. Oder drei." },
                { time: "01:30", icon: "🌙", title: "Ende (wer noch kann)", desc: "Offizielles Ende für alle, die morgen früh aufstehen müssen. Wer noch steht, darf bleiben. Wer nicht mehr steht — wir haben euch lieb." },
              ].map(({ time, icon, title, desc }) => (
                <Card key={title} className="flex items-start gap-4">
                  <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="text-xs font-bold tabular-nums" style={{ color: ACCENT }}>{time}</span>
                      <span className="font-semibold text-sm" style={{ color: "#1E2614" }}>{title}</span>
                    </div>
                    <p className="text-sm" style={{ color: MUTED }}>{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DRESSCODE ── */}
      <section ref={el => { sectionRefs.current[2] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Was anziehen?" title="Dresscode" />
            <div className="rounded-2xl overflow-hidden mb-4">
              <img src="/Dresscode.jpg" alt="Dresscode" className="w-full object-cover max-h-56" />
            </div>
            <Card className="text-center space-y-2 mb-3">
              <p className="text-xl font-bold" style={{ color: "#1E2614" }}>Festlich — mit Leichtigkeit</p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>Elegant genug für ein Hochzeitsfoto, bequem genug für die Tanzfläche um Mitternacht. Das Brautpaar ist automatisch das Schönste im Raum — du kannst entspannt auftreten. 😉</p>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              {[
                { icon: "✅", title: "Go for it", items: ["Elegante Kleidung", "Farbe & Freude", "Tanzschuhe", "Sonnenschutz"] },
                { icon: "🚫", title: "Lieber nicht", items: ["Weiss (reserviert)", "Pyjama", "Gummistiefel"] },
                { icon: "☀️", title: "Wichtig", items: ["August, Aare, Sonne", "Draussen & im Zelt", "Badesachen? Vielleicht 😄"] },
              ].map(({ icon, title, items }) => (
                <Card key={title} className="h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>{title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {items.map(item => (
                      <li key={item} className="text-sm flex gap-2 items-start" style={{ color: MUTED }}>
                        <span style={{ color: ACCENT }}>–</span>{item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANREISE ── */}
      <section ref={el => { sectionRefs.current[3] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Wie komme ich hin?" title="Anreise" />
            <div className="mb-4 p-4 rounded-2xl border flex gap-3 items-start" style={{ background: "#FFF8E7", borderColor: "#F0D080" }}>
              <span className="text-lg flex-shrink-0">⚠️</span>
              <div>
                <p className="font-semibold text-sm text-amber-900 mb-1">Das Navi lügt.</p>
                <p className="text-sm text-amber-700 leading-relaxed">GPS und Google Maps führen dich auf die <strong>falsche Seite der Aare</strong>. Ignoriere alle digitalen Ratschläge — folge den Schildern vor Ort.</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: "🚌⛵", title: "Bus Nr. 21 & Fähre", from: "Bern Bahnhof → Rossfeld → Übers Wasser", note: "Empfehlung — ÖV = entspannte Feier 🍾" },
                { icon: "🚗", title: "Auto", from: "Irgendwo → Bern", note: "Warnung oben beachten" },
                { icon: "🚶", title: "Zu Fuss", from: "Ab Tiefenau (RBS S9)", note: "Kurze Strecke entlang der Aare" },
                { icon: "🚲", title: "Publibike", from: "Eigene Station vor Ort", note: "Direkt beim Zehendermätteli" },
                { icon: "🚴", title: "Eigenes Velo", from: "Velowege entlang der Aare", note: "Abstellplätze vor Ort" },
              ].map(({ icon, title, from, note }) => (
                <Card key={title} className="flex items-center gap-4">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#1E2614" }}>{title}</p>
                    <p className="text-sm" style={{ color: MUTED }}>{from}</p>
                  </div>
                  <p className="text-xs text-right hidden sm:block max-w-[160px]" style={{ color: MUTED }}>{note}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANMELDUNG + FOOTER ── */}
      <section ref={el => { sectionRefs.current[4] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <SectionHeader label="Bist du dabei?" title="Anmeldung" />
            <p className="text-center text-sm mb-8" style={{ color: MUTED }}>
              Bitte bis <strong style={{ color: "#1E2614" }}>1. Juli 2026</strong> anmelden — damit die Küche weiss wie viele Teller sie aufwärmen soll.
            </p>
            <div className="bg-white rounded-2xl border border-[#CDD5B0] p-4 sm:p-6">
              <RsvpForm />
            </div>
          </div>
        </div>
        <footer className="px-6 py-8 text-center flex-shrink-0" style={{ background: "#1E2614" }}>
          <div className="flex justify-center gap-3 mb-4">
            {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ width: 50, height: 50, opacity: 0.85 }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-base font-bold mb-1" style={{ color: "#CDD5B0" }}>Mirjam & Laurent</p>
          <p className="text-sm" style={{ color: "rgba(205,213,176,0.55)" }}>14. August 2026 · Zehendermätteli, Bern</p>
          <p className="text-xs mt-3" style={{ color: "rgba(205,213,176,0.3)" }}>Made with 💚</p>
        </footer>
      </section>

      {/* ── LINE NAVIGATION ── */}
      <div style={{ position: "fixed", right: 4, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 8, zIndex: 50 }}>
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            style={{
              width: 4,
              height: active === i ? 80 : 40,
              borderRadius: 2,
              background: active === i ? ACCENT : "#CDD5B0",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

    </div>
  );
}
