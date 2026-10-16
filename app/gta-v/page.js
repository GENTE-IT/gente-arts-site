import ProductCatalog from "../../components/ProductCatalog";
import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import ScrollMotion from "../../components/motion/ScrollMotion";
import { products, fullName, categoryOf } from "../../data/products";
import { email } from "../../data/site";
import Raya from "../../components/brand/Raya";

const pageMetadata = { title: "GTA V", description: "Tienda de scripts, mapeados y ropa para GTA V (FiveM), compatibles con ESX y QBCore.", alternates: { canonical: "/gta-v" } };

// A shared link with ?p=<id> previews that card (title, description and the
// card image from /og/[id]) instead of the generic page.
export async function generateMetadata({ searchParams }) {
  const { p } = await searchParams;
  const product = products.find(product => product.id === p);
  if (!product) return pageMetadata;
  const title = fullName(product);
  const description = `${categoryOf(product).label} para ${product.gameLabel} · ${product.resource} v${product.version}. ${product.description}`;
  const image = { url: `/og/${product.id}`, width: 1200, height: 630, alt: `Tarjeta de acceso ${title}` };
  return { ...pageMetadata, title, description, openGraph: { title: `${title} — GENTE.ARTS`, description, images: [image] }, twitter: { card: "summary_large_image", title, images: [image.url] } };
}

export default function GtaVPage() {
  return <main id="contenido">
    <section className="catalogHero gtaVHero" data-parallax-box>
      <Media src="/assets/gta-v-hero.jpg" alt="Los Santos de noche" eager parallax={0.1} scale position="50% 45%"/>
      <div className="catalogHeroShade"/>
      <div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>01 · Tienda abierta</span></div>
      <div className="catalogHeroCopy"><div><p className="kicker kickerLight" data-reveal="fade">FiveM · ESX / QBCore</p><h1 data-split>GTA V.</h1></div><div data-reveal><p>Scripts, mapeados y ropa<br/>para tu servidor.</p><a href="#catalogo" className="circleArrow" aria-label="Ir a la tienda"><Icon name="down"/></a></div></div>
      <Raya className="heroRaya"/>
    </section>
    <ProductCatalog products={products.filter(product => product.game === "gta-v")}/>
    <section className="catalogBand" data-parallax-box>
      <div className="catalogBandMedia" data-img-reveal="left"><Media src="/assets/vinewood-sign.jpg" alt="Vista de Los Santos desde el cartel de Vinewood" sizes="100vw" parallax={0.12} position="50% 40%"/></div>
      <div className="catalogBandCopy"><p className="kicker kickerLight" data-reveal="fade">A medida</p><h2 data-split>¿No encuentras tu pieza?</h2><p data-reveal>Diseñamos mapeados, scripts y colecciones de ropa a medida para tu servidor.</p><a className="button lightButton" href={`mailto:${email}?subject=Proyecto%20a%20medida`} data-reveal>Hablemos de tu proyecto <Icon name="diagonal"/></a></div>
    </section>
    <ScrollMotion/>
  </main>;
}
