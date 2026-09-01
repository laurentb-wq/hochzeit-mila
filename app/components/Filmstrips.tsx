"use client";

/**
 * Zwei gegenläufige, endlos laufende Fotostreifen für den Hero-Bereich.
 * Oben: langsam von links nach rechts · Unten: gleichzeitig von rechts nach links.
 * Beide leicht schräg für eine dezente diagonale Bewegung.
 *
 * Nahtlose Endlosschleife: die Bildsequenz wird verdoppelt und der Track
 * animiert von 0 auf -50 % — dadurch kein sichtbarer Sprung beim Wiederholen.
 */

const PHOTOS = [
  "/Mibilabo1.JPG",
  "/Mibilabo2.JPG",
  "/Mibilabo3.jpg",
  "/Mibilaboalt.JPG",
];

// Leicht unterschiedliche Breiten, damit es wie ein echter Filmstreifen wirkt –
// die Höhe bleibt konstant, also bleibt der Streifen insgesamt ruhig.
const WIDTHS = [
  "clamp(150px, 34vw, 244px)",
  "clamp(116px, 26vw, 188px)",
  "clamp(168px, 40vw, 280px)",
  "clamp(134px, 30vw, 214px)",
];

const REPEATS = 5; // Grundsequenz pro Hälfte -> sicher breiter als jeder Viewport

function Strip({
  direction,
  rotate,
  edge,
}: {
  direction: "to-left" | "to-right";
  rotate: number;
  edge: { top: string } | { bottom: string };
}) {
  const half = Array.from({ length: REPEATS }, () => PHOTOS).flat();
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
      <Strip direction="to-right" rotate={-2.5} edge={{ top: "clamp(20px, 11vh, 132px)" }} />
      <Strip direction="to-left" rotate={2.5} edge={{ bottom: "clamp(20px, 11vh, 132px)" }} />
    </>
  );
}
