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
      vx: (Math.random() - 0.5) * 0.125,
      vy: (Math.random() - 0.5) * 0.125,
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
        o.vx += (cx - o.x) * 0.0002;
        o.vy += (cy - o.y) * 0.0002;
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
  { src: "/Mibilabo2.JPG",  title: "WIR HABEN GEHEIRATET" },
  { src: "/mibilabo3.JPG",  title: "DAS WOLLEN WIR FEIERN" },
  { src: "/Mibilabo1.jpg",  title: "BIST DU DABEI?" },
];

export default function ScrollIntro({ onDone }: { onDone: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [done, setDone] = useState(false);
  const prevIndex = useRef(0);

  // Refs for direct DOM style updates (no React re-render on every frame)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const textRef   = useRef<HTMLDivElement>(null);
  const bokehRef  = useBokehCanvas();

  useEffect(() => {
    const slideH = window.innerHeight;

    // Apply initial state immediately so slide 0 is visible
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity    = i === 0 ? "1" : "0";
      el.style.transform  = "translateY(0px)";
      el.style.filter     = "brightness(0.55) blur(0px)";
    });

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const ratio = y / slideH; // continuous 0→3

        if (ratio >= 3) {
          setDone(true);
          window.scrollTo({ top: 0, behavior: "instant" });
          onDone();
          return;
        }

        const idx      = Math.min(Math.floor(ratio), 2);
        const progress = ratio - idx; // 0→1 within current slide

        // Swap text on slide change
        if (idx !== prevIndex.current) {
          prevIndex.current = idx;
          setTitleVisible(false);
          setTimeout(() => {
            setSlideIndex(idx);
            setTitleVisible(true);
          }, 80);
        }

        // Update each image with parallax + blur
        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          const local = ratio - i; // negative=future, 0-1=active, >1=past

          // Parallax: image drifts down 70px over one full slide
          const translateY = local * 70;

          // Blur: peak at transition boundary (local → 1 or local just above 0)
          const outBlur = local > 0.55 ? ((local - 0.55) / 0.45) * 14 : 0;
          const inBlur  = local < 0 && local > -0.45 ? ((-local) / 0.45) * 8 : 0;
          const blur    = Math.max(outBlur, inBlur);

          // Opacity
          let opacity = 0;
          if (local >= 0 && local <= 1) {
            opacity = local > 0.65 ? 1 - ((local - 0.65) / 0.35) * 0.6 : 1;
          } else if (local > -0.45 && local < 0) {
            opacity = (local + 0.45) / 0.45;
          }

          el.style.transform = `translateY(${translateY}px)`;
          el.style.filter    = `brightness(0.55) blur(${blur}px)`;
          el.style.opacity   = String(Math.max(0, Math.min(1, opacity)));
        });

        // Text rises upward as you scroll through the slide
        if (textRef.current) {
          textRef.current.style.transform = `translateY(${-progress * 50}px)`;
        }
      });
    };

    const t = setTimeout(() => setTitleVisible(true), 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onDone]);

  function skip() {
    setDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    onDone();
  }

  if (done) return null;

  const slide = SLIDES[slideIndex];

  return (
    <>
      <div style={{ height: "400vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Background images — extra height so parallax drift doesn't show edges */}
          {SLIDES.map((s, i) => (
            <div
              key={s.src}
              ref={el => { imageRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: "-12%", left: 0, right: 0, bottom: "-12%",
                backgroundImage: `url(${s.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                willChange: "transform, filter, opacity",
              }}
            />
          ))}

          {/* Bokeh colour orbs */}
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

          {/* Text — moves up with scroll via ref */}
          <div
            ref={textRef}
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "0 24px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "white",
              zIndex: 2,
              willChange: "transform",
            }}
          >
            <h1 style={{
              fontSize: "clamp(28px, 6vw, 64px)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}>
              {slide.title}
            </h1>
          </div>

          {/* Scroll hint — slide 0 only */}
          {slideIndex === 0 && (
            <div style={{
              position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12, letterSpacing: "0.12em",
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
              zIndex: 3,
            }}>
              <span style={{ textTransform: "uppercase" }}>Scroll</span>
              <span style={{ animation: "bounceDown 1.6s ease infinite" }}>↓</span>
            </div>
          )}

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
            Skip Intro ↓
          </button>

          {/* Dot indicators */}
          <div style={{
            position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 10,
            zIndex: 3,
          }}>
            {SLIDES.map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: slideIndex === i ? "white" : "rgba(255,255,255,0.35)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </>
  );
}
