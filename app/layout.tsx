import type { Metadata } from "next";
import "./globals.css";
import BokehBackground from "./components/BokehBackground";

export const metadata: Metadata = {
  title: "Mirjam & Laurent — 14. August 2026",
  description: "Wir heiraten! Zehendermätteli im Glück, Bern.",
  robots: "noindex, nofollow",
  openGraph: {
    images: [{ url: "/Mibilabo1.jpg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <BokehBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
