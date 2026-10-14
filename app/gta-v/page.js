import ProductCatalog from "../../components/ProductCatalog";
import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import { products } from "../../data/products";

export const metadata = { title: "GTA V — GENTE.ARTS", description: "Explora la colección de scripts, mapeados, sistemas y ropa para GTA V y FiveM.", alternates: { canonical: "/gta-v" } };

export default function GtaVPage() {
  return <main id="contenido">
    <section className="catalogHero gtaVHero">
      <Media src="/assets/gta-v-wide.jpg" alt="Los Santos, universo GTA V" eager/>
      <div className="catalogHeroShade"/>
      <div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>01 / GENTE.ARTS</span></div>
      <div className="catalogHeroCopy"><div><p className="eyebrow">LOS SANTOS ES SOLO EL PRINCIPIO</p><h1>GTA V<span>.</span></h1></div><div><p>Más posibilidades<br/>para tu mundo.</p><a href="#catalogo" className="circleArrow" aria-label="Ir al catálogo"><Icon name="down"/></a></div></div>
    </section>
    <ProductCatalog products={products.filter(product => product.game === "gta-v")}/>
  </main>;
}
