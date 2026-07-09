import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { SITE_URL } from "@/app/lib/proyecto-utils";

// Sans de marca — Archivo (grotesca libre, alternativa a Neue Haas Display del manual v3)
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivo.variable} ${ibmPlexMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <a href="#main-content" className="skip-link">Ir al contenido principal</a>
        <Navbar />
        <main id="main-content" style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
