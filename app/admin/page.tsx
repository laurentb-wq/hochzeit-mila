import { supabase } from "@/lib/supabase";

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
const parentsLeaveLabel: Record<string, string> = {
  ja_alle: "Alle gehen zusammen",
  nein_ein_elternteil: "Ein Elternteil bleibt",
};
const arrivalLabel: Record<string, string> = {
  auto: "🚗 Auto",
  ov: "🚌 ÖV & Fähre",
  velo: "🚲 Velo",
  fuss: "🚶 Zu Fuss",
};

export default async function AdminPage() {
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
          <div className="space-y-3">
            {rsvps.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-[#CDD5B0] p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <p className="font-bold" style={{ color: "#1E2614" }}>
                      {r.name}{r.adult2_name ? ` & ${r.adult2_name}` : ""}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#8A9870" }}>
                      {new Date(r.created_at).toLocaleDateString("de-CH", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.attending === "yes" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {r.attending === "yes" ? "✓ Dabei" : "✗ Abgesagt"}
                  </span>
                </div>

                {r.attending === "yes" && (
                  <div className="space-y-2 border-t border-[#EBF0DC] pt-3 text-sm" style={{ color: "#74825A" }}>

                    {r.adult_remarks && (
                      <div className="flex gap-2">
                        <span>🥗</span>
                        <span><strong style={{ color: "#1E2614" }}>Unverträglichkeiten:</strong> {r.adult_remarks}</span>
                      </div>
                    )}

                    {(r.children_count ?? 0) > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex gap-2 items-center">
                          <span>👶</span>
                          <span className="font-semibold" style={{ color: "#1E2614" }}>
                            {r.children_count} {r.children_count === 1 ? "Kind" : "Kinder"}
                          </span>
                          {r.kids_stay && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBF0DC]" style={{ color: "#5C6B3A" }}>
                              {stayLabel[r.kids_stay] ?? r.kids_stay}
                            </span>
                          )}
                          {r.kids_parents_leave && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FFF8E7]" style={{ color: "#9a7a30" }}>
                              {parentsLeaveLabel[r.kids_parents_leave] ?? r.kids_parents_leave}
                            </span>
                          )}
                        </div>
                        {(r.children ?? []).map((c, i) => (
                          <div key={i} className="ml-6 flex flex-wrap gap-2 items-center text-xs">
                            <span style={{ color: "#1E2614" }}>Kind {i + 1}: {c.age} Jahre</span>
                            {Number(c.age) < 6 && (
                              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">gratis</span>
                            )}
                            {c.remarks && <span style={{ color: "#74825A" }}>— {c.remarks}</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {r.arrival && (
                      <div className="flex gap-2">
                        <span>🗺️</span>
                        <span>{arrivalLabel[r.arrival] ?? r.arrival}</span>
                      </div>
                    )}

                    {r.love_letter && (
                      <div className="flex gap-2 items-start mt-1 pt-2 border-t border-[#EBF0DC]">
                        <span>💌</span>
                        <span className="italic text-xs">&ldquo;{r.love_letter}&rdquo;</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
