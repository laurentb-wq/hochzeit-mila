"use client";
import { useState, useEffect } from "react";

const SRCS = ["/Mibilabo2.JPG", "/mibilabo3.JPG", "/Mibilabo1.jpg"];

export default function HeroImages() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex justify-center gap-3 sm:gap-4 mb-8">
      {SRCS.map((src, i) => (
        <div
          key={i}
          style={{
            width:  shrunk ? "clamp(80px,  25vw, 135px)" : "clamp(140px, 38vw, 260px)",
            height: shrunk ? "clamp(80px,  25vw, 135px)" : "clamp(140px, 38vw, 260px)",
            transition: "width 0.7s cubic-bezier(0.4,0,0.2,1), height 0.7s cubic-bezier(0.4,0,0.2,1)",
            borderRadius: shrunk ? "16px" : "24px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            flexShrink: 0,
          }}
        >
          <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      ))}
    </div>
  );
}
