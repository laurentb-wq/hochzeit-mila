import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminList from "./AdminList";
import type { Rsvp } from "./AdminList";

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

  const kidsStayAll = yes.reduce((s, r) =>
    r.children_count > 0 && r.kids_stay === "yes" ? s + r.children_count : s, 0);
  const kidsLeaveEarly = kids - kidsStayAll;

  const apero = adults + kids;
  const dessert = adults + kidsStayAll;

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

        {/* Bestellübersicht */}
        {yes.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#CDD5B0] p-5 mb-6">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "#5C6B3A" }}>Bestellübersicht</p>
            <div className="space-y-3">
              {[
                { label: "🥂 Apéro", count: apero },
                { label: "🍽️ Hauptgang", count: apero },
                { label: "🍰 Dessert", count: dessert },
              ].map(({ label, count }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-semibold" style={{ color: "#1E2614" }}>{label}</span>
                      <span className="text-sm font-bold" style={{ color: "#5C6B3A" }}>{count} Pers.</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F0F3E8" }}>
                      <div className="h-full rounded-full" style={{ width: apero > 0 ? `${(count / apero) * 100}%` : "0%", background: "#5C6B3A", transition: "width 0.5s" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {kidsLeaveEarly > 0 && (
              <p className="text-xs mt-4" style={{ color: "#8A9870" }}>
                * {kidsLeaveEarly} Kind{kidsLeaveEarly > 1 ? "er gehen" : " geht"} vor dem Dessert — Details in den Einträgen.
              </p>
            )}
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
          <AdminList rsvps={rsvps} />
        )}
      </div>
    </div>
  );
}
