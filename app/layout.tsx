import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SiteChrome from "./components/SiteChrome";
import ThemeSwitcher from "./components/ThemeSwitcher";
import IntroOverlay from "./components/IntroOverlay";
import { LangProvider } from "./components/LangProvider";
import { getServerLang } from "@/app/lib/lang-server";
import { SITE_URL } from "@/app/lib/proyecto-utils";

// Sans de marca — Neue Haas Display (tipografía oficial del manual de identidad).
// Self-hosted vía next/font/local desde app/fonts.
const neueHaas = localFont({
  src: [
    { path: "./fonts/NeueHaasDisplayLight.ttf", weight: "300", style: "normal" },
    { path: "./fonts/NeueHaasDisplayRoman.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NeueHaasDisplayRomanItalic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/NeueHaasDisplayMediu.ttf", weight: "500", style: "normal" },
    { path: "./fonts/NeueHaasDisplayMediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/NeueHaasDisplayBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const ibmPlexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://estudio-barda.com"),
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Barda Arquitectura",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "AR",
    availableLanguage: "Spanish",
  },
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const lang = await getServerLang();

  return (
    <html lang={lang} className={`${neueHaas.variable} ${ibmPlexMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <LangProvider initialLang={lang}>
          <SiteChrome>
            <a href="#main-content" className="skip-link">Ir al contenido principal</a>
          </SiteChrome>
          <Navbar />
          <main id="main-content" style={{ flex: 1 }}>{children}</main>
          {modal}
          <SiteChrome>
            <Footer />
          </SiteChrome>
          <ThemeSwitcher />
          <IntroOverlay />
        </LangProvider>
      </body>
    </html>
  );
}
