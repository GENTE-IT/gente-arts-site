import ProductCatalog from "../../components/ProductCatalog";
import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import ScrollMotion from "../../components/motion/ScrollMotion";
import { products } from "../../data/products";

export const metadata = { title: "GTA V", description: "Explora la colección de scripts, mapeados, sistemas y ropa para GTA V y FiveM.", alternates: { canonical: "/gta-v" } };

export default function GtaVPage() {
  return <main id="contenido">
    <section className="catalogHero gtaVHero" data-parallax-box>
      <Media src="/assets/gta-v-wide.jpg" alt="Los Santos, universo GTA V" eager parallax={0.1} position="50% 30%"/>
      <div className="catalogHeroShade"/>
      <div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>01 / GENTE.ARTS</span></div>
      <div className="catalogHeroCopy"><div><p className="eyebrow" data-reveal="fade">LOS SANTOS ES SOLO EL PRINCIPIO</p><h1 data-split>GTA V.</h1></div><div data-reveal><p>Más posibilidades<br/>para tu mundo.</p><a href="#catalogo" className="circleArrow" aria-label="Ir al catálogo"><Icon name="down"/></a></div></div>
    </section>
    <ProductCatalog products={products.filter(product => product.game === "gta-v")}/>
    <section className="catalogBand" data-parallax-box>
      <div className="catalogBandMedia"><Media src="/assets/vinewood-sign.jpg" alt="Vista de Los Santos desde el cartel de Vinewood" sizes="100vw" parallax={0.12} position="50% 40%"/></div>
      <div className="catalogBandCopy"><p className="eyebrow" data-reveal="fade"><span className="colorDash"/> A MEDIDA</p><h2 data-split>¿No encuentras tu pieza?</h2><p data-reveal>Diseñamos mapeados, scripts y colecciones de ropa a medida para tu servidor.</p><a className="button lightButton" href="mailto:hola@gente.arts?subject=Proyecto%20a%20medida" data-reveal>Hablemos de tu proyecto <Icon name="diagonal"/></a></div>
    </section>
    <ScrollMotion/>
  </main>;
}
