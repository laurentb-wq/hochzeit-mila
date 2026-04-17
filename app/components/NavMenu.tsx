"use client";
import { useState, useEffect, useRef } from "react";

const ACCENT = "#5C6B3A";
const LINKS = [
  ["#programm", "Programm"],
  ["#dresscode", "Dresscode"],
  ["#anreise", "Anreise"],
  ["#anmeldung", "Anmeldung"],
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-xl font-bold tracking-widest px-2 py-1 rounded-lg transition-opacity hover:opacity-70"
        style={{ color: "#CDD5B0", letterSpacing: "0.1em" }}
        aria-label="Menü"
      >
        ···
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden shadow-xl"
          style={{ background: "#1E2614", border: "1px solid rgba(205,213,176,0.15)", minWidth: 180 }}
        >
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-sm font-medium transition-colors hover:bg-white/5"
              style={{ color: "rgba(205,213,176,0.85)" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
