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
          <AdminList rsvps={rsvps} />
        )}
      </div>
    </div>
  );
}
