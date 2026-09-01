"use client";

/**
 * Zwei gegenläufige, endlos laufende Fotostreifen für den Hero-Bereich.
 * Oben: langsam von links nach rechts · Unten: gleichzeitig von rechts nach links.
 * Beide leicht schräg für eine dezente diagonale Bewegung.
 *
 * Nahtlose Endlosschleife: die Bildsequenz wird verdoppelt und der Track
 * animiert von 0 auf -50 % — dadurch kein sichtbarer Sprung beim Wiederholen.
 *
 * Bilder: verkleinerte Auswahl aus dem Hochzeits-Drive-Ordner, public/hero/.
 */

const COUNT = 30;
const ALL = Array.from({ length: COUNT }, (_, i) => `/hero/hero-${String(i + 1).padStart(2, "0")}.jpg`);

// Obere und untere Reihe bekommen unterschiedliche Bilder, damit nichts doppelt läuft.
const TOP = ALL.filter((_, i) => i % 2 === 0);
const BOTTOM = ALL.filter((_, i) => i % 2 === 1);

// Leicht unterschiedliche Breiten -> wirkt wie ein echter Filmstreifen,
// die Höhe bleibt konstant, also bleibt der Streifen insgesamt ruhig.
const WIDTHS = [
  "clamp(150px, 34vw, 244px)",
  "clamp(116px, 26vw, 188px)",
  "clamp(168px, 40vw, 280px)",
  "clamp(134px, 30vw, 214px)",
];

const REPEATS = 3; // Grundsequenz pro Hälfte -> sicher breiter als jeder Viewport

function Strip({
  photos,
  direction,
  rotate,
  edge,
}: {
  photos: string[];
  direction: "to-left" | "to-right";
  rotate: number;
  edge: { top: string } | { bottom: string };
}) {
  const half = Array.from({ length: REPEATS }, () => photos).flat();
  const cells = [...half, ...half]; // verdoppelt für den nahtlosen Loop

  return (
    <div
      className="filmstrip-frame"
      aria-hidden="true"
      style={{ ...edge, transform: `rotate(${rotate}deg)` }}
    >
      <div className={`filmstrip-track ${direction}`}>
        {cells.map((src, i) => (
          <div
            key={i}
            className="filmstrip-cell"
            style={{ width: WIDTHS[i % WIDTHS.length] }}
          >
            <img src={src} alt="" loading="eager" decoding="async" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Filmstrips() {
  return (
    <>
      <Strip
        photos={TOP}
        direction="to-right"
        rotate={-2.5}
        edge={{ top: "clamp(20px, 11vh, 132px)" }}
      />
      <Strip
        photos={BOTTOM}
        direction="to-left"
        rotate={2.5}
        edge={{ bottom: "clamp(20px, 11vh, 132px)" }}
      />
    </>
  );
}
