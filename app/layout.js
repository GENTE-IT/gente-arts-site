import "./globals.css";
import { Archivo, JetBrains_Mono } from "next/font/google";
import ShopProvider from "../components/ShopProvider";
import { SiteHeader, SiteFooter } from "../components/SiteShell";

// One family for everything: Archivo's width axis gives the extended display
// cuts for headlines and the normal cut for text, without a second font.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", axes: ["wdth"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

export const metadata = {
  metadataBase: new URL("https://gente-arts-site-psi.vercel.app"),
  title: { default: "GENTE.ARTS — Tarjetas de acceso a recursos para GTA V", template: "%s | GENTE.ARTS" },
  description: "Estudio creativo digital. Mapeados, scripts, sistemas y ropa para servidores de GTA V y FiveM, entregados como tarjetas de acceso. GTA VI, próximamente.",
  openGraph: { title: "GENTE.ARTS — Tu mundo. Tu manera.", description: "Recursos digitales para GTA con identidad propia.", locale: "es_ES", type: "website", images: [{ url: "/brand/gente-arts-final.png", width: 900, height: 900, alt: "GENTE.ARTS" }] },
  twitter: { card: "summary", title: "GENTE.ARTS — Tu mundo. Tu manera.", images: ["/brand/gente-arts-final.png"] }
};

export const viewport = { themeColor: "#141614", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="es" className={`${archivo.variable} ${mono.variable}`} data-scroll-behavior="smooth"><body><ShopProvider><a className="skipLink" href="#contenido">Saltar al contenido</a><SiteHeader/>{children}<SiteFooter/></ShopProvider></body></html>;
}
