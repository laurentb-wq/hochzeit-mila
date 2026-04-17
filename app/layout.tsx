import type { Metadata } from "next";
import "./globals.css";
import BokehBackground from "./components/BokehBackground";

export const metadata: Metadata = {
  title: "Mirjam & Laurent — 14. August 2025",
  description: "Wir heiraten! Zehendermätteli im Glück, Bern.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <BokehBackground />
        {children}
      </body>
    </html>
  );
}
