import "./globals.css";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import ShopProvider from "../components/ShopProvider";
import { SiteHeader, SiteFooter } from "../components/SiteShell";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export const metadata = {
  metadataBase: new URL("https://gente-arts-site.vercel.app"),
  title: { default: "GENTE.ARTS — Recursos digitales para GTA V y GTA VI", template: "%s | GENTE.ARTS" },
  description: "Estudio creativo digital. Mapeados, scripts, sistemas y ropa para servidores de GTA V y FiveM, con identidad propia. GTA VI, próximamente.",
  openGraph: { title: "GENTE.ARTS — Tu mundo. Tu manera.", description: "Un estudio creativo para mundos abiertos.", locale: "es_ES", type: "website", images: [{ url: "/brand/gente-arts-final.png", width: 900, height: 900, alt: "GENTE.ARTS" }] },
  twitter: { card: "summary", title: "GENTE.ARTS — Tu mundo. Tu manera.", images: ["/brand/gente-arts-final.png"] }
};

export const viewport = { themeColor: "#0b0c0b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="es" className={`${body.variable} ${display.variable} ${mono.variable}`} data-scroll-behavior="smooth"><body><ShopProvider><a className="skipLink" href="#contenido">Saltar al contenido</a><SiteHeader/>{children}<SiteFooter/></ShopProvider></body></html>;
}
