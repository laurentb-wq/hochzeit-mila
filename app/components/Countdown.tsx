"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-14T16:00:00");

function getLeft() {
  const d = TARGET.getTime() - Date.now();
  if (d <= 0) return null;
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}

export default function Countdown() {
  const [t, setT] = useState(getLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;

  return (
    <div className="flex gap-6 sm:gap-10 justify-center">
      {[
        { v: t.days, l: "Tage" },
        { v: t.hours, l: "Stunden" },
        { v: t.minutes, l: "Minuten" },
        { v: t.seconds, l: "Sekunden" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <span className="text-4xl sm:text-5xl font-700 tabular-nums font-bold" style={{ color: "var(--accent)" }}>
            {String(v).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--muted)" }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}
