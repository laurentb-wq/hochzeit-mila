import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mirjam & Laurent — 14. August 2026",
  description: "Wir haben geheiratet — das wollen wir feiern! Bist du dabei?",
  openGraph: {
    title: "Mirjam & Laurent — 14. August 2026",
    description: "Wir haben geheiratet — das wollen wir feiern! Bist du dabei?",
    images: [{ url: "/Mibilabo1.jpg" }],
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
