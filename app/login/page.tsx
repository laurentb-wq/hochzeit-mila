"use client";
import { useState } from "react";

const ACCENT = "#5C6B3A";
const MUTED = "#74825A";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 360,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderRadius: 24,
        border: "1px solid #CDD5B0",
        padding: "40px 32px",
        boxShadow: "0 8px 40px rgba(92,107,58,0.10)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 32, marginBottom: 8 }}>💚</p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1E2614", margin: "0 0 4px" }}>
          Mirjam & Laurent
        </h1>
        <p style={{ fontSize: 13, color: MUTED, margin: "0 0 28px" }}>14. August 2026</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Passwort"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${error ? "#f87171" : "#CDD5B0"}`,
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              background: "white",
            }}
          />
          {error && (
            <p style={{ fontSize: 13, color: "#f87171", margin: 0 }}>
              Falsches Passwort.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            style={{
              background: ACCENT,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              opacity: loading || !pw ? 0.5 : 1,
              fontFamily: "inherit",
            }}
          >
            {loading ? "…" : "Weiter →"}
          </button>
        </form>
      </div>
    </div>
  );
}
