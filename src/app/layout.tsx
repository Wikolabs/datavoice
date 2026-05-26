import type { Metadata } from "next";
import { Cinzel, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataVoice — Posez une question. Obtenez un insight.",
  description:
    "Agent BI en langage naturel — interrogez vos données comme vous parlez, obtenez des graphiques et analyses instantanées.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${sourceSerif.variable}`}>
      <body style={{ background: "#eff6ff", fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
