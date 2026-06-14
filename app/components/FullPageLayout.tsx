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
  { label: "Sonstiges", idx: 4 },
  { label: "Anmeldung", idx: 5 },
];

const SECTION_COUNT = 6;
const NAV_H = 64;
const NAV_H_MOBILE = 100;

export default function FullPageLayout() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      { threshold: isMobile ? 0.2 : 0.5 }
    );
    sectionRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, [isMobile]);

  function scrollTo(i: number) {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  }

  const navH = isMobile ? NAV_H_MOBILE : NAV_H;

  const sectionStyle: React.CSSProperties = isMobile ? {
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    paddingTop: navH,
  } : {
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
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "#1E2614", height: navH }}>
        {isMobile ? (
          /* Mobile: Anmeldung top-right, links centered below */
          <div className="h-full flex flex-col justify-center px-4 gap-3">
            <div className="flex justify-end">
              <button
                onClick={() => scrollTo(5)}
                style={{
                  background: active === 5 ? "white" : ACCENT,
                  color: active === 5 ? ACCENT : "white",
                  border: "none", borderRadius: 999,
                  padding: "5px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              >
                Anmeldung
              </button>
            </div>
            <div className="flex justify-center gap-4 text-xs">
              {NAV_LINKS.filter(l => l.label !== "Anmeldung").map(({ label, idx }) => {
                const isActive = active === idx;
                return (
                  <button key={label} onClick={() => scrollTo(idx)} style={{
                    color: isActive ? "#CDD5B0" : "rgba(205,213,176,0.5)",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "inherit", fontWeight: isActive ? 700 : 400,
                    padding: "2px 0",
                    borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                    transition: "all 0.3s ease",
                  }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: links centered, Anmeldung right */
          <div className="relative h-full flex items-center px-6">
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-sm">
              {NAV_LINKS.filter(l => l.label !== "Anmeldung").map(({ label, idx }) => {
                const isActive = active === idx;
                return (
                  <button key={label} onClick={() => scrollTo(idx)} style={{
                    color: isActive ? "#CDD5B0" : "rgba(205,213,176,0.5)",
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "inherit", fontWeight: isActive ? 700 : 400,
                    padding: "4px 0",
                    borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => scrollTo(5)}
              style={{
                marginLeft: "auto",
                background: active === 5 ? "white" : ACCENT,
                color: active === 5 ? ACCENT : "white",
                border: "none", borderRadius: 999,
                padding: "7px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
                cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Anmeldung
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={el => { sectionRefs.current[0] = el; }} style={sectionStyle}>
        <div className="flex flex-col items-center justify-center text-center px-6 py-10 flex-1">
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {["/Mibilabo1.jpg", "/Mibilabo2.JPG", "/Mibilabo3.JPG"].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md" style={{
                width: "clamp(80px, 25vw, 135px)",
                height: isMobile ? "clamp(80px, 25vw, 135px)" : undefined,
                aspectRatio: isMobile ? undefined : "4/5",
              }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm mb-4 font-light" style={{ color: MUTED }}>Wir haben ja gesagt und das wollen wir feiern!</p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-3" style={{ color: "#1E2614" }}>WIR FREUEN UNS AUF DICH.</h1>
          <p className="text-lg font-light mb-8" style={{ color: MUTED }}>14. August 2026 · Zehendermätteli · Bern</p>
          <Countdown />
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full">
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">🗓️</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Datum</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>14. August 2026</p>
            </Card>
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">📍</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Location</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>Zehendermätteli</p>
            </Card>
            <Card className="space-y-2 flex flex-col">
              <p className="text-2xl">📋</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Anmeldung</p>
              <p className="font-bold text-base" style={{ color: "#1E2614" }}>Bis 1. Juli 2026</p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PROGRAMM ── */}
      <section ref={el => { sectionRefs.current[1] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="So läuft das Ganze ab" title="Programm" />
            <div className="relative max-w-xs mx-auto sm:max-w-lg">
              <div className="absolute left-[52px] sm:left-1/2 sm:-translate-x-1/2 top-4 bottom-4 w-px" style={{ background: "#D6DCC8" }} />
              {[
                { time: "ab 15:30", icon: "👋", title: "Eintreffen" },
                { time: "16:00",    icon: "💍", title: "Spalier stehen" },
                { time: "16:15",    icon: "🥂", title: "Apéro" },
                { time: "18:30",    icon: "🍽️", title: "Abendessen" },
                { time: "21:30",    icon: "🍰", title: "Dessert" },
                { time: "01:00",    icon: "🌙", title: "Letzte Runde" },
                { time: "01:30",    icon: "✨", title: "Ende" },
              ].map(({ time, icon, title }) => (
                <div key={title} className="flex items-center gap-4 py-3 relative sm:gap-0">
                  <span className="text-xs font-semibold tabular-nums text-right w-10 flex-shrink-0 leading-none sm:w-1/2 sm:pr-5 sm:text-sm" style={{ color: MUTED }}>{time}</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-base sm:w-10 sm:h-10 sm:text-lg" style={{ background: "#F0F2EA", border: "1.5px solid #D6DCC8" }}>{icon}</div>
                  <span className="font-semibold text-sm sm:w-1/2 sm:pl-5 sm:text-base" style={{ color: "#1E2614" }}>{title}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-6" style={{ color: MUTED }}>* Programmänderung vorbehalten</p>
          </div>
        </div>
      </section>

      {/* ── DRESSCODE ── */}
      <section ref={el => { sectionRefs.current[2] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Was anziehen?" title="Dresscode" />

            <Card className="text-center space-y-2 mb-3">
              <p className="text-xl font-bold" style={{ color: "#1E2614" }}>Festlich Sommerlich</p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>Elegant genug fürs Hochzeitsfoto, bequem genug bis zum letzten Programmpunkt.</p>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              {[
                { icon: "✨", title: "Wir freuen uns über", items: ["Farben statt Schwarz", "Luftige Sommeroutfits", "Festliche Leichtigkeit", "Gute Laune"] },
                { icon: "☀️", title: "Wichtig", items: ["August, Aare, Sonne", "Draussen & im Gewächshaus", "Badesachen? Vielleicht 😄"] },
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
            <div className="space-y-3">
              {[
                { icon: "🚌⛵", title: "Bus Nr. 21 & Fähre", from: "Bis Bremgarten Schloss → 400m Spaziergang zur Fähre · Rückweg per Taxi", recommended: true },
                { icon: "🚗", title: "Auto", from: "Achtung: Das Navi führt auf die falsche Seite der Aare. Anfahrt via Reichenbachstrasse bis ans Ende im Wald. Es hat Parkplätze vor Ort, es kann aber sein, dass diese bereits besetzt sind.", recommended: false },
                { icon: "🚲", title: "Publibike", from: "Eigene Station direkt beim Zehendermätteli", recommended: false },
                { icon: "🚴", title: "Eigenes Velo", from: "Via Reichenbachstrasse durch den Wald bis direkt zum Zehendermätteli", recommended: false },
                { icon: "🚀", title: "Jetpack", from: "Definitiv die schnellste und einfachste Variante.", recommended: false },
              ].map(({ icon, title, from, recommended }) => (
                <Card key={title} className="flex items-center gap-4">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm" style={{ color: "#1E2614" }}>{title}</p>
                      {recommended && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "#EEF2E6", color: ACCENT }}>Empfehlung</span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: MUTED }}>{from}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SONSTIGES ── */}
      <section ref={el => { sectionRefs.current[4] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="Noch ein paar Dinge" title="Sonstiges" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Card className="space-y-3">
                <p className="text-2xl">🎁</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Geschenke</p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Wenn ihr uns was schenken wollt, freuen wir uns über einen Zuschuss in unsere Familienkasse.
                </p>
              </Card>

              <Card className="space-y-3">
                <p className="text-2xl">💬</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Bei Fragen</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: MUTED }}>
                  Bei Fragen, die uns nichts angehen, bitte an unsere Trauzeugen wenden:
                </p>
                <div className="space-y-2 text-sm" style={{ color: MUTED }}>
                  <div className="flex justify-between"><span className="font-semibold" style={{ color: "#1E2614" }}>Julia</span><span>079 487 84 72</span></div>
                  <div className="flex justify-between"><span className="font-semibold" style={{ color: "#1E2614" }}>Niro</span><span>076 597 17 35</span></div>
                  <div className="flex justify-between"><span className="font-semibold" style={{ color: "#1E2614" }}>Max</span><span>079 748 96 85</span></div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* ── ANMELDUNG + FOOTER ── */}
      <section ref={el => { sectionRefs.current[5] = el; }} style={sectionStyle}>
        <div className="px-6 py-10 flex-1 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <SectionHeader label="Bist du dabei?" title="Anmeldung" />
            <p className="text-center text-sm mb-8" style={{ color: MUTED }}>
              Bitte bis <strong style={{ color: "#1E2614" }}>1. Juli 2026</strong> an- oder abmelden.
            </p>
            <div className="bg-white rounded-2xl border border-[#CDD5B0] p-4 sm:p-6">
              <RsvpForm />
            </div>
          </div>
        </div>
        <footer className="px-6 py-4 sm:py-3 mt-6 sm:mt-0 text-center flex-shrink-0 space-y-1" style={{ background: "#1E2614" }}>
          <p className="text-xs" style={{ color: "rgba(205,213,176,0.5)" }}>Made with 💚 & Claude Code</p>
          <p className="text-xs" style={{ color: "rgba(205,213,176,0.35)" }}>Mirjam Bieri und Laurent Born · Önizstrasse 43 · 3008 Bern</p>
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
