"use client";
import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  color: string;
  phase: number;
  phaseSpeed: number;
}

// rgb values for each color
const PALETTE = [
  "92, 107, 58",     // #5C6B3A dark olive
  "116, 130, 90",    // medium olive
  "160, 175, 120",   // light olive
  "200, 210, 155",   // pale sage
  "210, 190, 110",   // warm gold
  "185, 175, 95",    // muted gold
];

const ORB_COUNT = 22;

function randomOrb(w: number, h: number): Orb {
  const r = 80 + Math.random() * 200;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    baseOpacity: 0.22 + Math.random() * 0.25,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.004 + Math.random() * 0.006,
  };
}

export default function BokehBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let animId: number;
    let orbs: Orb[] = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      orbs = Array.from({ length: ORB_COUNT }, () =>
        randomOrb(canvas.width, canvas.height)
      );
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const o of orbs) {
        o.phase += o.phaseSpeed;
        o.x += o.vx;
        o.y += o.vy;

        // wrap around viewport
        if (o.x < -o.r) o.x = canvas.width + o.r;
        else if (o.x > canvas.width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.height + o.r;
        else if (o.y > canvas.height + o.r) o.y = -o.r;

        const opacity = o.baseOpacity * (0.65 + 0.35 * Math.sin(o.phase));
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${o.color}, ${opacity})`);
        g.addColorStop(0.45, `rgba(${o.color}, ${opacity * 0.35})`);
        g.addColorStop(1,   `rgba(${o.color}, 0)`);

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    }

    init();
    tick();

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
