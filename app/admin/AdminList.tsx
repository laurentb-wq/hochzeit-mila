"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ChildEntry = { age: string; remarks: string };
export type Rsvp = {
  id: number;
  created_at: string;
  name: string;
  attending: string;
  adult2_name: string | null;
  adult_remarks: string | null;
  children_count: number;
  children: ChildEntry[] | null;
  kids_stay: string | null;
  kids_parents_leave: string | null;
  arrival: string | null;
  love_letter: string | null;
};

const stayLabel: Record<string, string> = {
  nach_dessert: "Bis nach Dessert",
  nach_hauptgang: "Bis nach Hauptgang",
  nach_apero: "Bis nach Apéro",
};
const parentsLabel: Record<string, string> = {
  ja_alle: "Alle gehen zusammen",
  nein_ein_elternteil: "Ein Elternteil bleibt",
};
const arrivalLabel: Record<string, string> = {
  auto: "🚗 Auto", ov: "🚌 ÖV & Fähre", velo: "🚲 Velo", fuss: "🚶 Zu Fuss",
};

const inputCls = "w-full border border-[#CDD5B0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5C6B3A]";

function EditModal({ rsvp, onClose, onSave }: { rsvp: Rsvp; onClose: () => void; onSave: (updated: Partial<Rsvp>) => void }) {
  const [form, setForm] = useState({
    name: rsvp.name ?? "",
    adult2_name: rsvp.adult2_name ?? "",
    attending: rsvp.attending ?? "yes",
    adult_remarks: rsvp.adult_remarks ?? "",
    arrival: rsvp.arrival ?? "",
    love_letter: rsvp.love_letter ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/rsvp/${rsvp.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        adult2_name: form.adult2_name || null,
        attending: form.attending,
        adult_remarks: form.adult_remarks || null,
        arrival: form.arrival || null,
        love_letter: form.love_letter || null,
      }),
    });
    onSave({ ...form, adult2_name: form.adult2_name || null, adult_remarks: form.adult_remarks || null, arrival: form.arrival || null, love_letter: form.love_letter || null });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4" onClick={e => e.stopPropagation()}>
        <h2 className="font-bold text-base" style={{ color: "#1E2614" }}>Eintrag bearbeiten</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Name</label>
            <input className={inputCls} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Begleitperson</label>
            <input className={inputCls} value={form.adult2_name} placeholder="Leer = keine" onChange={e => setForm(p => ({ ...p, adult2_name: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Teilnahme</label>
            <select className={inputCls} value={form.attending} onChange={e => setForm(p => ({ ...p, attending: e.target.value }))}>
              <option value="yes">✓ Dabei</option>
              <option value="no">✗ Abgesagt</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Unverträglichkeiten</label>
            <input className={inputCls} value={form.adult_remarks} onChange={e => setForm(p => ({ ...p, adult_remarks: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Anreise</label>
            <select className={inputCls} value={form.arrival} onChange={e => setForm(p => ({ ...p, arrival: e.target.value }))}>
              <option value="">—</option>
              <option value="auto">🚗 Auto</option>
              <option value="ov">🚌 ÖV & Fähre</option>
              <option value="velo">🚲 Velo</option>
              <option value="fuss">🚶 Zu Fuss</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A9870" }}>Liebesbrief</label>
            <textarea className={inputCls} rows={3} value={form.love_letter} onChange={e => setForm(p => ({ ...p, love_letter: e.target.value }))} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-[#CDD5B0] text-sm font-semibold" style={{ color: "#74825A" }}>Abbrechen</button>
          <button onClick={save} disabled={saving} className="flex-1 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#5C6B3A" }}>
            {saving ? "Speichern…" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RsvpRow({ rsvp: initial }: { rsvp: Rsvp }) {
  const [rsvp, setRsvp] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`${rsvp.name} wirklich löschen?`)) return;
    setDeleting(true);
    await fetch(`/api/rsvp/${rsvp.id}`, { method: "DELETE" });
    setDeleted(true);
    router.refresh();
  }

  function handleSave(updated: Partial<Rsvp>) {
    setRsvp(p => ({ ...p, ...updated }));
    setEditing(false);
  }

  if (deleted) return null;

  const names = rsvp.adult2_name ? `${rsvp.name} & ${rsvp.adult2_name}` : rsvp.name;
  const kidsCount = rsvp.children_count ?? 0;

  return (
    <>
      {editing && <EditModal rsvp={rsvp} onClose={() => setEditing(false)} onSave={handleSave} />}

      {/* Compact row */}
      <div className="bg-white rounded-xl border border-[#CDD5B0] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FAFBF7] transition-colors"
          onClick={() => setOpen(o => !o)}>

          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rsvp.attending === "yes" ? "bg-green-400" : "bg-gray-300"}`} />

          <span className="font-semibold text-sm flex-1" style={{ color: "#1E2614" }}>{names}</span>

          <div className="flex items-center gap-2 flex-shrink-0">
            {rsvp.attending === "yes" && (<>
              {rsvp.arrival && <span className="text-xs hidden sm:inline" style={{ color: "#8A9870" }}>{arrivalLabel[rsvp.arrival]}</span>}
              {kidsCount > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">👶 {kidsCount}</span>}
              {rsvp.adult_remarks && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500">🥗</span>}
              {rsvp.love_letter && <span className="text-xs">💌</span>}
            </>)}
            <span className="text-xs" style={{ color: "#8A9870" }}>
              {new Date(rsvp.created_at).toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" })}
            </span>
            <span className="text-xs ml-1" style={{ color: "#CDD5B0" }}>{open ? "▲" : "▼"}</span>
          </div>
        </div>

        {/* Expanded detail */}
        {open && (
          <div className="px-4 pb-4 border-t border-[#F0F3E8] pt-3 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              <Detail label="Teilnahme" value={rsvp.attending === "yes" ? "✓ Dabei" : "✗ Abgesagt"} />
              {rsvp.adult2_name && <Detail label="Begleitperson" value={rsvp.adult2_name} />}
              {rsvp.arrival && <Detail label="Anreise" value={arrivalLabel[rsvp.arrival]} />}
              {rsvp.adult_remarks && <Detail label="Unverträglichkeiten" value={rsvp.adult_remarks} />}
              {kidsCount > 0 && <Detail label="Kinder" value={`${kidsCount} Kind${kidsCount > 1 ? "er" : ""}`} />}
              {rsvp.kids_stay && <Detail label="Kinder bleiben" value={stayLabel[rsvp.kids_stay]} />}
              {rsvp.kids_parents_leave && <Detail label="Eltern gehen" value={parentsLabel[rsvp.kids_parents_leave]} />}
            </div>
            {(rsvp.children ?? []).map((c, i) => (
              <div key={i} className="text-xs ml-1" style={{ color: "#5C6B3A" }}>
                Kind {i + 1}: {c.age} Jahre{Number(c.age) < 6 ? " (gratis)" : ""}{c.remarks ? ` — ${c.remarks}` : ""}
              </div>
            ))}
            {rsvp.love_letter && (
              <div className="mt-2 pt-2 border-t border-[#F0F3E8]">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A9870" }}>💌 Liebesbrief</p>
                <p className="text-sm italic" style={{ color: "#5C6B3A" }}>&ldquo;{rsvp.love_letter}&rdquo;</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button onClick={() => setEditing(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#CDD5B0] hover:bg-[#F4F8EE] transition"
                style={{ color: "#5C6B3A" }}>✏️ Bearbeiten</button>
              <button onClick={handleDelete} disabled={deleting}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-100 hover:bg-red-50 transition text-red-400">
                {deleting ? "…" : "🗑️ Löschen"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider" style={{ color: "#8A9870" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: "#1E2614" }}>{value}</p>
    </div>
  );
}

export default function AdminList({ rsvps }: { rsvps: Rsvp[] }) {
  return (
    <div className="space-y-2">
      {rsvps.map(r => <RsvpRow key={r.id} rsvp={r} />)}
    </div>
  );
}
