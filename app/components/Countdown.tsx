"use client";
import { useEffect, useRef, useState } from "react";

const TARGET = new Date("2026-08-14T16:00:00");

function getLeft() {
  const d = TARGET.getTime() - Date.now();
  if (d <= 0) return null;
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}

function AnimatedNumber({ value }: { value: number }) {
  const str = String(value).padStart(2, "0");
  const prev = useRef(str);
  const [display, setDisplay] = useState(str);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (str === prev.current) return;
    setAnimating(true);
    const id = setTimeout(() => {
      setDisplay(str);
      prev.current = str;
      setAnimating(false);
    }, 180);
    return () => clearTimeout(id);
  }, [str]);

  return (
    <div style={{ overflow: "hidden", lineHeight: 1 }}>
      <span
        style={{
          display: "block",
          transform: animating ? "translateY(-100%)" : "translateY(0)",
          opacity: animating ? 0 : 1,
          transition: animating
            ? "transform 0.18s ease-in, opacity 0.18s ease-in"
            : "transform 0.18s ease-out, opacity 0.18s ease-out",
        }}
      >
        {display}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState(getLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;

  return (
    <div className="flex gap-4 sm:gap-10 justify-center">
      {[
        { v: t.days,    l: "Tage" },
        { v: t.hours,   l: "Stunden" },
        { v: t.minutes, l: "Minuten" },
        { v: t.seconds, l: "Sekunden" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-1">
          <span
            className="text-2xl sm:text-5xl font-bold tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            <AnimatedNumber value={v} />
          </span>
          <span className="text-[9px] sm:text-xs uppercase tracking-widest font-medium" style={{ color: "var(--muted)" }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}
