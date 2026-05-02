import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Barda Arquitectura",
    template: "%s — Barda Arquitectura",
  },
  description:
    "Estudio de arquitectura en Buenos Aires. Viviendas, refacciones y proyectos de distintas escalas.",
  openGraph: {
    siteName: "Barda Arquitectura",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
