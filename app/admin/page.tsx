import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ChildEntry = { age: string; remarks: string };
type Rsvp = {
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
  auto: "🚗 Auto",
  ov: "🚌 ÖV & Fähre",
  velo: "🚲 Velo",
  fuss: "🚶 Zu Fuss",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2 border-b border-[#F0F3E8] last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wider w-40 flex-shrink-0 pt-0.5" style={{ color: "#8A9870" }}>{label}</span>
      <span className="text-sm flex-1" style={{ color: "#1E2614" }}>{value || <span style={{ color: "#ccc" }}>—</span>}</span>
    </div>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;
  if (auth !== "1") redirect("/admin/login");

  let rsvps: Rsvp[] = [];
  let errorMsg = "";

  if (!supabase) {
    errorMsg = "Supabase nicht konfiguriert.";
  } else {
    const { data, error } = await supabase
      .from("rsvp").select("*").order("created_at", { ascending: false });
    if (error) errorMsg = error.message;
    else rsvps = data ?? [];
  }

  const yes = rsvps.filter(r => r.attending === "yes");
  const no = rsvps.filter(r => r.attending === "no");
  const adults = yes.reduce((s, r) => s + (r.adult2_name ? 2 : 1), 0);
  const kids = yes.reduce((s, r) => s + (r.children_count ?? 0), 0);
  const arrivals = { auto: 0, ov: 0, velo: 0, fuss: 0 };
  yes.forEach(r => { if (r.arrival && r.arrival in arrivals) arrivals[r.arrival as keyof typeof arrivals]++; });

  return (
    <div style={{ background: "#EAEDDA", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#5C6B3A" }}>Admin</p>
          <h1 className="text-2xl font-bold" style={{ color: "#1E2614" }}>Anmeldungen</h1>
          <p className="text-sm mt-1" style={{ color: "#74825A" }}>Mirjam & Laurent · 14. August 2026</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { v: yes.length, l: "Zusagen", c: "#5a9e6f" },
            { v: no.length, l: "Absagen", c: "#9e9e9e" },
            { v: adults, l: "Erwachsene", c: "#5C6B3A" },
            { v: kids, l: "Kinder", c: "#9e7ab5" },
          ].map(({ v, l, c }) => (
            <div key={l} className="bg-white rounded-2xl border border-[#CDD5B0] p-5 text-center">
              <p className="text-3xl font-bold" style={{ color: c }}>{v}</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "#74825A" }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Anreise */}
        {yes.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#CDD5B0] p-5 mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#5C6B3A" }}>Anreise</p>
            <div className="grid grid-cols-4 gap-4 text-center">
              {Object.entries(arrivalLabel).map(([k, l]) => (
                <div key={k}>
                  <p className="font-bold text-xl" style={{ color: "#1E2614" }}>{arrivals[k as keyof typeof arrivals]}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#74825A" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-500 text-sm">{errorMsg}</div>
        )}

        {rsvps.length === 0 && !errorMsg ? (
          <div className="text-center py-20" style={{ color: "#AAAACC" }}>
            <p className="text-3xl mb-2">🕊️</p>
            <p className="text-sm">Noch keine Anmeldungen.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rsvps.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-[#CDD5B0] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-6 py-4" style={{ background: r.attending === "yes" ? "#F4F8EE" : "#F8F8F8" }}>
                  <div>
                    <p className="font-bold text-base" style={{ color: "#1E2614" }}>
                      {r.name}{r.adult2_name ? ` & ${r.adult2_name}` : ""}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#8A9870" }}>
                      Eingegangen: {new Date(r.created_at).toLocaleDateString("de-CH", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.attending === "yes" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {r.attending === "yes" ? "✓ Dabei" : "✗ Abgesagt"}
                  </span>
                </div>

                {/* Details */}
                <div className="px-6 py-4">
                  <Row label="Name" value={r.name} />
                  {r.adult2_name && <Row label="Begleitperson" value={r.adult2_name} />}
                  <Row label="Teilnahme" value={r.attending === "yes" ? "✓ Dabei" : "✗ Abgesagt"} />

                  {r.attending === "yes" && (<>
                    <Row label="Unverträglichkeiten" value={r.adult_remarks} />
                    <Row label="Anreise" value={r.arrival ? arrivalLabel[r.arrival] : null} />
                    <Row label="Kinder" value={
                      (r.children_count ?? 0) > 0
                        ? `${r.children_count} Kind${r.children_count === 1 ? "" : "er"}`
                        : "Keine"
                    } />
                    {(r.children ?? []).map((c, i) => (
                      <Row key={i} label={`Kind ${i + 1}`} value={
                        `${c.age} Jahre${Number(c.age) < 6 ? " (gratis)" : ""}${c.remarks ? ` — ${c.remarks}` : ""}`
                      } />
                    ))}
                    {(r.children_count ?? 0) > 0 && (
                      <Row label="Kinder bleiben" value={r.kids_stay ? stayLabel[r.kids_stay] : null} />
                    )}
                    {r.kids_parents_leave && (
                      <Row label="Eltern gehen" value={parentsLabel[r.kids_parents_leave]} />
                    )}
                    {r.love_letter && (
                      <div className="mt-3 pt-3 border-t border-[#F0F3E8]">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#8A9870" }}>💌 Liebesbrief</p>
                        <p className="text-sm italic" style={{ color: "#5C6B3A" }}>&ldquo;{r.love_letter}&rdquo;</p>
                      </div>
                    )}
                  </>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
