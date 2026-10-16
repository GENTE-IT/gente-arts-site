import "./globals.css";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import ShopProvider from "../components/ShopProvider";
import ThemeProvider, { themeBootScript } from "../components/ThemeProvider";
import { SiteHeader, SiteFooter } from "../components/SiteShell";

// Three families, one job each (brand manual, ch. 13): Unbounded for the name,
// headlines and product names; Manrope for text and interface; JetBrains Mono
// for versions, resource names and labels.
const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "800"], variable: "--font-unbounded", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export const metadata = {
  metadataBase: new URL("https://gente-arts-site-psi.vercel.app"),
  title: { default: "GENTE.ARTS — Scripts, mapeados y ropa para tu servidor", template: "%s | GENTE.ARTS" },
  description: "Estudio de software y diseño para servidores de rol: scripts, mapeados y ropa para GTA V (FiveM). Preparamos contenido para GTA VI.",
  // Preview images come from app/opengraph-image.js (site) and /og/[id] (per card).
  openGraph: { title: "GENTE.ARTS — Hecho por gente, para tu servidor.", description: "Scripts, mapeados y ropa para tu servidor.", locale: "es_ES", type: "website", siteName: "GENTE.ARTS" },
  twitter: { card: "summary_large_image", title: "GENTE.ARTS — Hecho por gente, para tu servidor." }
};

export const viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F5F4F0" }, { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" }], width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="es" className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootScript }}/></head><body><ThemeProvider><ShopProvider><a className="skipLink" href="#contenido">Saltar al contenido</a><SiteHeader/>{children}<SiteFooter/></ShopProvider></ThemeProvider></body></html>;
}
