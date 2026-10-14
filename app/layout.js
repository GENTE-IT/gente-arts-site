import "./globals.css";
import ShopProvider from "../components/ShopProvider";
import { SiteHeader, SiteFooter } from "../components/SiteShell";

export const metadata = {
  metadataBase: new URL("https://gente-arts-site.vercel.app"),
  title: "GENTE.ARTS — GTA Digital Store",
  description: "Recursos digitales con identidad. Explora scripts, mapeados y ropa para GTA V. Descubre el próximo universo GTA VI.",
  openGraph: { title: "GENTE.ARTS — Tu mundo. Tu manera.", description: "Un estudio creativo para mundos abiertos.", locale: "es_ES", type: "website", images: [{ url: "/brand/gente-arts-final.png", width: 900, height: 900, alt: "GENTE.ARTS" }] },
  twitter: { card: "summary", title: "GENTE.ARTS — Tu mundo. Tu manera.", images: ["/brand/gente-arts-final.png"] }
};

export const viewport = { themeColor: "#f4f4f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="es" data-scroll-behavior="smooth"><body><ShopProvider><a className="skipLink" href="#contenido">Saltar al contenido</a><SiteHeader/>{children}<SiteFooter/></ShopProvider></body></html>;
}
