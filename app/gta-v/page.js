import Image from "next/image";
import Link from "next/link";
import ProductCatalog from "../../components/ProductCatalog";
import { SiteFooter, SiteHeader } from "../../components/SiteShell";
import { products } from "../../data/products";

export const metadata = { title:"GTA V — GENTE.ARTS", description:"Scripts, mapeados, sistemas y ropa para GTA V y FiveM." };

export default function GtaVPage() {
  const gtaProducts=products.filter(product=>product.game==="gta-v");
  return <><SiteHeader/><main>
    <section className="catalogHero gtaVHero">
      <Image src="/assets/gta-v-wide.jpg" alt="Universo GTA V" fill priority sizes="100vw"/>
      <div className="catalogHeroShade"/><div className="catalogHeroTop"><Link href="/">← VOLVER</Link><span>01 / UNIVERSO DISPONIBLE</span></div>
      <div className="catalogHeroCopy"><p className="kicker"><span/> GENTE.ARTS / GTA V</p><h1>GTA V</h1><p>Recursos digitales para servidores con criterio propio.</p><a href="#catalogo">EXPLORAR COLECCIÓN ↓</a></div>
    </section>
    <div id="catalogo"><ProductCatalog products={gtaProducts}/></div>
  </main><SiteFooter/></>;
}
