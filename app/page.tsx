import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";
import AnimatedSection from "./components/AnimatedSection";
import NavMenu from "./components/NavMenu";

const ACCENT = "#5C6B3A";
const MUTED = "#74825A";
const CARD_BG = "white";

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center space-y-2 mb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
        {label}
      </p>
      <h2 className="text-3xl font-bold" style={{ color: "#1E2614" }}>
        {title}
      </h2>
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

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "#1E2614" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
          <span />
          <div className="hidden sm:flex gap-6 text-sm font-medium">
            {[["#programm","Programm"],["#dresscode","Dresscode"],["#anreise","Anreise"],["#anmeldung","Anmeldung"]].map(([h,l]) => (
              <a key={h} href={h} className="hover:opacity-70 transition-opacity" style={{ color: "rgba(205,213,176,0.7)" }}>{l}</a>
            ))}
          </div>
          <a href="#anmeldung"
            className="text-xs font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ background: ACCENT }}>
            Anmelden
          </a>
        </div>
      </nav>

      <main className="pt-16 sm:pt-20">

        {/* ── HERO ── */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-36">
          <AnimatedSection>
            <div className="flex justify-center gap-2 sm:gap-3 mb-8">
              {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-md" style={{ width: "clamp(80px, 25vw, 135px)", height: "clamp(80px, 25vw, 135px)" }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <p className="text-sm mb-4 font-light" style={{ color: MUTED }}>
              Wir haben den nächsten Schritt gewagt und 💍
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-3" style={{ color: "#1E2614" }}>
              das wollen wir feiern!
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg font-light mb-10" style={{ color: MUTED }}>
              14. August 2026 · Zehendermätteli · Bern
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Countdown />
          </AnimatedSection>
        </section>

        {/* ── INFO KACHELN ── */}
        <section className="px-6 pb-10 -mt-8">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            <AnimatedSection delay={0.1} className="h-full">
              <Card className="space-y-2 h-full flex flex-col">
                <p className="text-2xl">📅</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Datum</p>
                <p className="font-bold text-base" style={{ color: "#1E2614" }}>14. August 2026</p>
                <p className="text-sm flex-1" style={{ color: MUTED }}>Ab ca. 15:30 Uhr bis die Sterne zählen</p>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.15} className="h-full">
              <Card className="space-y-2 h-full flex flex-col">
                <p className="text-2xl">📍</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Location</p>
                <p className="font-bold text-base" style={{ color: "#1E2614" }}>Zehendermätteli im Glück</p>
                <p className="text-sm flex-1" style={{ color: MUTED }}>Reichenbachstrasse 161, 3004 Bern</p>
                <a href="https://maps.google.com/?q=Reichenbachstrasse+161+3004+Bern"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold hover:opacity-70 transition-opacity mt-auto"
                  style={{ color: ACCENT }}>
                  Google Maps →
                </a>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="h-full">
              <Card className="space-y-2 h-full flex flex-col">
                <p className="text-2xl">📋</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Anmeldung</p>
                <p className="font-bold text-base" style={{ color: "#1E2614" }}>Bis 1. Juli 2026</p>
                <p className="text-sm flex-1" style={{ color: MUTED }}>Damit die Küche weiss, wie viele Teller sie aufwärmen soll.</p>
                <a href="#anmeldung" className="inline-block text-sm font-semibold hover:opacity-70 transition-opacity mt-auto" style={{ color: ACCENT }}>
                  Jetzt anmelden →
                </a>
              </Card>
            </AnimatedSection>
          </div>
        </section>


        {/* ── PROGRAMM ── */}
        <section id="programm" className="px-6 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <SectionHeader label="Der grosse Tag" title="Programm" />
            </AnimatedSection>
            <div className="space-y-3">
              {[
                { time: "15:30", icon: "👋", title: "Eintreffen & Ankommen", desc: "Komm pünktlich, such dir einen guten Platz und tu so, als hättest du die Location schon immer gekannt. Sekt steht bereit." },
                { time: "16:00", icon: "💍", title: "Startschuss & Spalier stehen", desc: "Jetzt wird's ernst. Spalier aufstellen, Konfetti bereithalten, Taschentücher nicht vergessen. Handy auf stumm — wirklich." },
                { time: "18:30", icon: "🍽️", title: "Abendessen", desc: "Endlich. Das Warten hat sich gelohnt. Mehrere Gänge, gutes Essen, noch bessere Gesellschaft. Wer jetzt noch nüchtern redet, hat selbst schuld." },
                { time: "21:30", icon: "🍰", title: "Dessert", desc: "Der süsse Höhepunkt des Abends — ausser natürlich dem Jawort. Torte, Glück und Zuckerschock inklusive." },
                { time: "01:00", icon: "🎶", title: "Letzte Runde", desc: "Die Beine schmerzen, die Stimme ist heiser — und trotzdem will niemand gehen. Noch ein Tanz. Oder drei." },
                { time: "01:30", icon: "🌙", title: "Ende (wer noch kann)", desc: "Offizielles Ende für alle, die morgen früh aufstehen müssen. Wer noch steht, darf bleiben. Wer nicht mehr steht — wir haben euch lieb." },
              ].map(({ time, icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={i * 0.05}>
                  <Card className="flex items-start gap-4">
                    <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="text-xs font-bold tabular-nums" style={{ color: ACCENT }}>{time}</span>
                        <span className="font-semibold text-sm" style={{ color: "#1E2614" }}>{title}</span>
                      </div>
                      <p className="text-sm" style={{ color: MUTED }}>{desc}</p>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── DRESSCODE ── */}
        <section id="dresscode" className="px-6 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <SectionHeader label="Was anziehen?" title="Dresscode" />
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <div className="rounded-2xl overflow-hidden mb-4">
                <img src="/Dresscode.jpg" alt="Dresscode" className="w-full object-cover max-h-80" />
              </div>
            </AnimatedSection>
            <div className="space-y-3">
              <AnimatedSection delay={0.1}>
                <Card className="text-center space-y-2">
                  <p className="text-xl font-bold" style={{ color: "#1E2614" }}>Festlich — mit Leichtigkeit</p>
<p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    Elegant genug für ein Hochzeitsfoto, bequem genug für die Tanzfläche um Mitternacht.
                    Das Brautpaar ist automatisch das Schönste im Raum — du kannst entspannt auftreten. 😉
                  </p>
                </Card>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                {[
                  { icon: "✅", title: "Go for it", items: ["Elegante Kleidung", "Farbe & Freude", "Tanzschuhe", "Sonnenschutz"] },
                  { icon: "🚫", title: "Lieber nicht", items: ["Weiss (reserviert)", "Pyjama", "Gummistiefel"] },
                  { icon: "☀️", title: "Wichtig", items: ["August, Aare, Sonne", "Draussen & im Zelt", "Badesachen? Vielleicht 😄"] },
                ].map(({ icon, title, items }, i) => (
                  <AnimatedSection key={title} delay={0.1 + i * 0.08} className="h-full">
                    <Card className="h-full">
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
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ── ANREISE ── */}
        <section id="anreise" className="px-6 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <SectionHeader label="Wie komme ich hin?" title="Anreise" />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="mb-4 p-4 rounded-2xl border flex gap-3 items-start"
                style={{ background: "#FFF8E7", borderColor: "#F0D080" }}>
                <span className="text-lg flex-shrink-0">⚠️</span>
                <div>
                  <p className="font-semibold text-sm text-amber-900 mb-1">Das Navi lügt.</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    GPS und Google Maps führen dich auf die <strong>falsche Seite der Aare</strong>.
                    Ignoriere alle digitalen Ratschläge — folge den Schildern vor Ort.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="space-y-3">
              {[
                { icon: "🚌", title: "Bus Nr. 21", from: "Bern Bahnhof → Rossfeld", note: "Empfehlung — ÖV = entspannte Feier 🍾" },
                { icon: "🚆", title: "RBS S9", from: "Bern Bahnhof → Tiefenau", note: "Klingt weit, ist Bern — also nah" },
                { icon: "⛵", title: "Mit der Fähre", from: "Übers Wasser", note: "Automatische Coolness-Punkte" },
                { icon: "🚗", title: "Auto", from: "Irgendwo → Bern", note: "Möglich — aber Warnung oben beachten" },
              ].map(({ icon, title, from, note }, i) => (
                <AnimatedSection key={title} delay={0.1 + i * 0.07}>
                  <Card className="flex items-center gap-4">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "#1E2614" }}>{title}</p>
                      <p className="text-sm" style={{ color: MUTED }}>{from}</p>
                    </div>
                    <p className="text-xs text-right hidden sm:block max-w-[160px]" style={{ color: MUTED }}>{note}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.5}>
              <Card className="mt-4 text-center">
                <p className="text-sm italic" style={{ color: MUTED }}>
                  🚂 Den Zug verpasst? Nutze die Zeit für ein Ständchen vor dem Bahnhof.
                  Wir erfahren davon.
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ── ANMELDUNG ── */}
        <section id="anmeldung" className="px-6 py-12 sm:py-20">
          <div className="max-w-lg mx-auto">
            <AnimatedSection>
              <SectionHeader label="Bist du dabei?" title="Anmeldung" />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-center text-sm mb-8" style={{ color: MUTED }}>
                Bitte bis <strong style={{ color: "#1E2614" }}>1. Juli 2026</strong> anmelden —
                damit die Küche weiss wie viele Teller sie aufwärmen soll.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl border border-[#CDD5B0] p-4 sm:p-6">
                <RsvpForm />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-6 py-14 text-center" style={{ background: "#1E2614" }}>
          <div className="flex justify-center gap-3 mb-6">
            {["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ width: 60, height: 60, opacity: 0.85 }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-lg font-bold mb-1" style={{ color: "#CDD5B0" }}>Mirjam & Laurent</p>
          <p className="text-sm" style={{ color: "rgba(205,213,176,0.55)" }}>14. August 2026 · Zehendermätteli im Glück, Bern</p>
          <p className="text-xs mt-4" style={{ color: "rgba(205,213,176,0.3)" }}>Made with 💚</p>
        </footer>

      </main>
    </div>
  );
}
