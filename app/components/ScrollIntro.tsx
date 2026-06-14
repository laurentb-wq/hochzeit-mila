"use client";
import { useEffect, useRef, useState } from "react";

const BOKEH_PALETTE = [
  "92, 107, 58",
  "116, 130, 90",
  "160, 175, 120",
  "200, 210, 155",
  "210, 190, 110",
  "185, 175, 95",
];

function useBokehCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = W / 2, cy = H / 2;
    const orbs = Array.from({ length: 10 }, () => ({
      x: cx + (Math.random() - 0.5) * W * 0.45,
      y: cy + (Math.random() - 0.5) * H * 0.28,
      r: 70 + Math.random() * 130,
      vx: (Math.random() - 0.5) * 0.0625,
      vy: (Math.random() - 0.5) * 0.0625,
      baseOpacity: 0.38 + Math.random() * 0.28,
      color: BOKEH_PALETTE[Math.floor(Math.random() * BOKEH_PALETTE.length)],
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.007 + Math.random() * 0.01,
    }));
    let animId: number;
    function tick() {
      ctx!.clearRect(0, 0, W, H);
      for (const o of orbs) {
        o.phase += o.phaseSpeed;
        o.vx += (cx - o.x) * 0.0001;
        o.vy += (cy - o.y) * 0.0001;
        o.x += o.vx;
        o.y += o.vy;
        const op = o.baseOpacity * (0.65 + 0.35 * Math.sin(o.phase));
        const g = ctx!.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${o.color}, ${op})`);
        g.addColorStop(0.5, `rgba(${o.color}, ${op * 0.3})`);
        g.addColorStop(1,   `rgba(${o.color}, 0)`);
        ctx!.beginPath();
        ctx!.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }
      animId = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(animId);
  }, []);
  return canvasRef;
}

const SLIDES = [
  { src: "/Mibilabo1.jpg",  title: "WIR HABEN GEHEIRATET" },
  { src: "/Mibilabo2.JPG",  title: "DAS WOLLEN WIR FEIERN" },
  { src: "/Mibilabo3.JPG",  title: "BIST DU DABEI?" },
];

const DURATION = 2000;

export default function ScrollIntro({ onDone }: { onDone: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [done, setDone] = useState(false);
  const bokehRef = useBokehCanvas();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex < SLIDES.length - 1) {
        setSlideIndex(i => i + 1);
      } else {
        setDone(true);
        onDoneRef.current();
      }
    }, DURATION);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  function skip() {
    setDone(true);
    onDoneRef.current();
  }

  if (done) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, overflow: "hidden" }}>

      {/* Background images — crossfade + Ken Burns zoom */}
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: i === slideIndex ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <div
            key={i === slideIndex ? `active-${slideIndex}` : `idle-${i}`}
            style={{
              position: "absolute",
              inset: "-6%",
              backgroundImage: `url(${s.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.55)",
              animation: i === slideIndex ? `kenBurns ${DURATION + 800}ms linear forwards` : "none",
            }}
          />
        </div>
      ))}

      {/* Bokeh */}
      <canvas
        ref={bokehRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      {/* Text + progress bar */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 2,
        padding: "0 24px",
        textAlign: "center",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <h1
          key={slideIndex}
          style={{
            fontSize: "clamp(28px, 6vw, 64px)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1.15,
            color: "white",
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            animation: "fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {SLIDES[slideIndex].title}
        </h1>

        {/* Progress bar */}
        <div style={{
          marginTop: 28,
          width: "clamp(120px, 30vw, 220px)",
          height: 2,
          background: "rgba(255,255,255,0.25)",
          borderRadius: 1,
          overflow: "hidden",
        }}>
          <div
            key={slideIndex}
            style={{
              height: "100%",
              background: "white",
              borderRadius: 1,
              animation: `introProgress ${DURATION}ms linear forwards`,
            }}
          />
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={skip}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 999,
          color: "white",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          padding: "8px 18px",
          cursor: "pointer",
          letterSpacing: "0.05em",
          zIndex: 3,
        }}
      >
        Skip ↓
      </button>


<style>{`
        @keyframes introProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
