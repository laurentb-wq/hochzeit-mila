"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#5C6B3A";
const MUTED = "#74825A";

type ChildEntry = { age: string; remarks: string };
type Form = {
  attending: string;
  adult1Name: string;
  hasCompanion: string;
  adult2Name: string;
  adultRemarks: string;
  hasChildren: string;
  childrenCount: number;
  children: ChildEntry[];
  kidsLeaveTime: string;
  kidsParentsLeave: string;
  arrival: string;
  loveLetter: string;
};

const init: Form = {
  attending: "",
  adult1Name: "",
  hasCompanion: "",
  adult2Name: "",
  adultRemarks: "",
  hasChildren: "",
  childrenCount: 0,
  children: [],
  kidsLeaveTime: "nach_dessert",
  kidsParentsLeave: "",
  arrival: "",
  loveLetter: "",
};

const inputCls =
  "w-full bg-white border border-[#CDD5B0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5C6B3A] focus:ring-2 focus:ring-[#5C6B3A]/15 transition placeholder:text-gray-300";

const slide = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
      {children}
    </p>
  );
}

function Divider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: "#CDD5B0" }} />
      <p className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: ACCENT }}>
        {title}
      </p>
      <div className="flex-1 h-px" style={{ background: "#CDD5B0" }} />
    </div>
  );
}

function Pills({
  options, value, onChange, cols = 2,
}: {
  options: { v: string; l: string }[];
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {options.map(({ v, l }) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className="py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all text-center"
          style={value === v
            ? { background: ACCENT, color: "white", borderColor: ACCENT }
            : { background: "white", color: MUTED, borderColor: "#CDD5B0" }}>
          {l}
        </button>
      ))}
    </div>
  );
}

export default function RsvpForm() {
  const [form, setForm] = useState<Form>(init);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm(p => ({ ...p, [k]: v }));

  function setChildrenCount(n: number) {
    setForm(p => ({
      ...p,
      childrenCount: n,
      children: Array.from({ length: n }, (_, i) => p.children[i] ?? { age: "", remarks: "" }),
    }));
  }

  function updateChild(i: number, field: keyof ChildEntry, v: string) {
    setForm(p => ({ ...p, children: p.children.map((c, idx) => idx === i ? { ...c, [field]: v } : c) }));
  }

  const isYes = form.attending === "yes";
  const isNo = form.attending === "no";

  function validate() {
    if (!form.attending) return "Bitte angeben ob du dabei bist.";
    if (!form.adult1Name.trim()) return "Bitte deinen Namen eingeben.";
    if (!isYes) return "";
    if (form.hasCompanion === "yes" && !form.adult2Name.trim()) return "Bitte den Namen der Begleitperson eingeben.";
    if (!form.hasChildren) return "Bitte angeben ob Kinder mitkommen.";
    if (form.hasChildren === "yes") {
      for (let i = 0; i < form.childrenCount; i++) {
        if (!form.children[i]?.age) return `Bitte Alter für Kind ${i + 1} eingeben.`;
      }
      if (!form.kidsLeaveTime) return "Bitte angeben wie lange die Kinder bleiben.";
      if (form.kidsLeaveTime !== "nach_dessert" && !form.kidsParentsLeave)
        return "Bitte angeben ob beide Elternteile mitgehen.";
    }
    if (!form.arrival) return "Bitte Anreiseart angeben.";
    return "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate();
    if (error) { setErr(error); return; }
    setErr(""); setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attending: form.attending,
          adult1_name: form.adult1Name,
          adult2_name: form.hasCompanion === "yes" ? form.adult2Name : null,
          adult_remarks: form.adultRemarks || null,
          children_count: isYes && form.hasChildren === "yes" ? form.childrenCount : 0,
          children: isYes && form.hasChildren === "yes" ? form.children : null,
          kids_stay: isYes && form.hasChildren === "yes" ? form.kidsLeaveTime : null,
          kids_parents_leave: isYes && form.hasChildren === "yes" && form.kidsLeaveTime !== "nach_dessert"
            ? form.kidsParentsLeave : null,
          arrival: isYes ? form.arrival : null,
          love_letter: form.loveLetter || null,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 space-y-3">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        className="text-5xl">🎉</motion.div>
      <p className="text-xl font-bold" style={{ color: "#1E2614" }}>Danke!</p>
      <p style={{ color: MUTED }} className="text-sm">Wir freuen uns riesig auf dich am 14. August.</p>
    </motion.div>
  );

  return (
    <form onSubmit={submit} className="space-y-6">

      {/* SCHRITT 1: TEILNAHME */}
      <div className="space-y-3">
        <Divider title="Schritt 1 — Teilnahme" />
        <div>
          <Label>Kannst du kommen?</Label>
          <Pills
            options={[{ v: "yes", l: "Ja, ich bin dabei 🥂" }, { v: "no", l: "Leider nicht 😢" }]}
            value={form.attending}
            onChange={v => set("attending", v)}
          />
        </div>

        <AnimatePresence>
          {form.attending && (
            <motion.div key="name1" {...slide}>
              <Label>Dein Name</Label>
              <input type="text" value={form.adult1Name}
                onChange={e => set("adult1Name", e.target.value)}
                placeholder="Vorname Nachname" className={inputCls} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* YES PATH */}
      <AnimatePresence>
        {isYes && (
          <motion.div key="yes-path" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-6">

            {/* ERWACHSENE */}
            <div className="space-y-3">
              <Divider title="Erwachsene" />

              <div>
                <Label>Kommt eine Begleitperson mit?</Label>
                <Pills
                  options={[{ v: "yes", l: "Ja" }, { v: "no", l: "Nein, ich komme alleine" }]}
                  value={form.hasCompanion}
                  onChange={v => set("hasCompanion", v)}
                />
              </div>

              <AnimatePresence>
                {form.hasCompanion === "yes" && (
                  <motion.div key="companion" {...slide}>
                    <Label>Name der Begleitperson</Label>
                    <input type="text" value={form.adult2Name}
                      onChange={e => set("adult2Name", e.target.value)}
                      placeholder="Vorname Nachname" className={inputCls} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {form.hasCompanion && (
                  <motion.div key="adult-remarks" {...slide}>
                    <Label>Unverträglichkeiten & Ernährungswünsche</Label>
                    <textarea value={form.adultRemarks}
                      onChange={e => set("adultRemarks", e.target.value)}
                      placeholder="z.B. laktosefrei, vegetarisch, keine Nüsse… (für alle Erwachsenen)"
                      rows={3} className={`${inputCls} resize-none`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* KINDER */}
            <AnimatePresence>
              {form.hasCompanion && (
                <motion.div key="kids-section" {...slide} className="space-y-3">
                  <Divider title="Kinder" />

                  <div>
                    <Label>Kommen Kinder mit?</Label>
                    <Pills
                      options={[{ v: "yes", l: "Ja" }, { v: "no", l: "Nein" }]}
                      value={form.hasChildren}
                      onChange={v => { set("hasChildren", v); if (v === "no") setChildrenCount(0); }}
                    />
                  </div>

                  <AnimatePresence>
                    {form.hasChildren === "yes" && (
                      <motion.div key="kids-detail" {...slide} className="space-y-4">
                        <div>
                          <Label>Anzahl Kinder</Label>
                          <Pills cols={3}
                            options={[{ v: "1", l: "1 Kind" }, { v: "2", l: "2 Kinder" }, { v: "3", l: "3 Kinder" }]}
                            value={form.childrenCount > 0 ? String(form.childrenCount) : ""}
                            onChange={v => setChildrenCount(Number(v))}
                          />
                        </div>

                        <AnimatePresence>
                          {form.children.map((child, i) => (
                            <motion.div key={i} {...slide}
                              className="bg-[#F4F6EE] rounded-2xl p-5 border border-[#CDD5B0] space-y-3">
                              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>
                                Kind {i + 1}
                              </p>
                              <div>
                                <Label>Alter</Label>
                                <input type="number" min={0} max={17} value={child.age}
                                  onChange={e => updateChild(i, "age", e.target.value)}
                                  placeholder="Alter in Jahren" className={inputCls} />
                                <AnimatePresence>
                                  {child.age !== "" && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                      className="text-xs mt-1.5 font-medium"
                                      style={{ color: Number(child.age) < 6 ? "#5a9e6f" : ACCENT }}>
                                      {Number(child.age) < 6
                                        ? "✓ Unter 6 Jahre — kostenlos"
                                        : "Normaler Menüpreis"}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div>
                                <Label>Unverträglichkeiten (optional)</Label>
                                <input type="text" value={child.remarks}
                                  onChange={e => updateChild(i, "remarks", e.target.value)}
                                  placeholder="z.B. keine Milch, mag kein Gemüse…" className={inputCls} />
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {form.childrenCount > 0 && (
                          <motion.div {...slide} className="space-y-3">
                            <div>
                              <Label>Wie lange plant ihr zu bleiben?</Label>
                              <Pills cols={1}
                                options={[
                                  { v: "nach_dessert", l: "Bis nach dem Dessert" },
                                  { v: "nach_hauptgang", l: "Bis nach dem Hauptgang" },
                                  { v: "nach_apero", l: "Bis nach dem Apéro" },
                                ]}
                                value={form.kidsLeaveTime}
                                onChange={v => { set("kidsLeaveTime", v); set("kidsParentsLeave", ""); }}
                              />
                            </div>
                            <AnimatePresence>
                              {(form.kidsLeaveTime === "nach_hauptgang" || form.kidsLeaveTime === "nach_apero") && (
                                <motion.div key="parents-leave" {...slide}>
                                  <Label>Gehen beide Elternteile mit den Kindern nach Hause?</Label>
                                  <Pills cols={1}
                                    options={[
                                      { v: "ja_alle", l: "Ja, wir gehen alle zusammen" },
                                      { v: "nein_ein_elternteil", l: "Nein, ein Elternteil bleibt noch" },
                                    ]}
                                    value={form.kidsParentsLeave}
                                    onChange={v => set("kidsParentsLeave", v)}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ANREISE */}
            <AnimatePresence>
              {form.hasChildren && (
                <motion.div key="arrival" {...slide} className="space-y-3">
                  <Divider title="Anreise" />
                  <div>
                    <Label>Wie kommt ihr?</Label>
                    <Pills cols={2}
                      options={[
                        { v: "auto", l: "🚗 Auto" },
                        { v: "ov", l: "🚌 ÖV & Fähre" },
                        { v: "velo", l: "🚲 Velo" },
                        { v: "fuss", l: "🚶 Zu Fuss" },
                      ]}
                      value={form.arrival}
                      onChange={v => set("arrival", v)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIEBESBRIEF */}
            <AnimatePresence>
              {form.arrival && (
                <motion.div key="love" {...slide} className="space-y-3">
                  <Divider title="💌 Liebesbrief ans Brautpaar" />
                  <p className="text-xs" style={{ color: MUTED }}>
                    Kein Druck — aber wenn du uns etwas sagen möchtest, ist hier Platz.
                    Wir versprechen, es nicht laut vorzulesen. Wahrscheinlich.
                  </p>
                  <textarea value={form.loveLetter}
                    onChange={e => set("loveLetter", e.target.value)}
                    placeholder="Liebe Mirjam, lieber Laurent…"
                    rows={4} className={`${inputCls} resize-none`} />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBMIT */}
      <AnimatePresence>
        {((isNo && form.adult1Name.trim()) || (isYes && form.arrival)) && (
          <motion.div key="submit" {...slide}>
            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-red-400 text-sm mb-3">{err}</motion.p>
              )}
            </AnimatePresence>
            <motion.button type="submit" disabled={status === "loading"}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-50"
              style={{ background: ACCENT }}>
              {status === "loading" ? "Wird gesendet…" : "Anmeldung absenden →"}
            </motion.button>
            {status === "error" && (
              <p className="text-red-400 text-sm text-center mt-2">Fehler — bitte versuch es nochmal.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  );
}
