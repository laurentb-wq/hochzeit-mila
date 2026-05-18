"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "123") {
      document.cookie = "admin_auth=1; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setErr(true);
    }
  }

  return (
    <div style={{ background: "#EAEDDA", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-[#CDD5B0] p-8 w-full max-w-sm shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#5C6B3A" }}>Admin</p>
        <h1 className="text-xl font-bold mb-6" style={{ color: "#1E2614" }}>Passwort eingeben</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false); }}
            placeholder="Passwort"
            autoFocus
            className="w-full border border-[#CDD5B0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5C6B3A]"
          />
          {err && <p className="text-red-400 text-sm">Falsches Passwort</p>}
          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "#5C6B3A" }}>
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}
