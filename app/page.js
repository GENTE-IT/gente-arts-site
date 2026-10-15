import BrandHero from "../components/BrandHero";
import Marquee from "../components/Marquee";
import UniversePortal from "../components/UniversePortal";
import HowItWorks from "../components/HowItWorks";
import FeaturedRail from "../components/FeaturedRail";
import Manifesto from "../components/Manifesto";
import Media from "../components/Media";
import StudioLink from "../components/StudioLink";
import Icon from "../components/Icon";
import ScrollMotion from "../components/motion/ScrollMotion";
import { products, featuredProducts } from "../data/products";

const principles = [
  ["Identidad propia", "Recursos para dar forma al lugar que imaginas, no plantillas que se repiten en cada servidor."],
  ["Rendimiento primero", "Colisiones revisadas, LOD optimizado y código organizado para que el detalle no cueste frames."],
  ["Soporte de verdad", "Documentación con cada tarjeta y una persona al otro lado del email cuando algo no cuadra."],
];

export default function Home() {
  const hero = products.find(product => product.id === "skyline-villa");
  return <main id="contenido">
    <BrandHero product={hero}/>
    <Marquee/>
    <UniversePortal/>
    <HowItWorks product={products.find(product => product.id === "velocity-mechanic")}/>
    <FeaturedRail products={featuredProducts}/>
    <Manifesto/>
    <section className="studioSection" id="estudio">
      <div className="studioIntro"><p className="kicker" data-reveal="fade">El estudio</p><h2 data-split>El detalle lo cambia todo.</h2><p className="studioLead" data-reveal>Diseñamos recursos para GTA V y FiveM como si fueran productos: con criterio, documentación y alguien que responde.</p><StudioLink className="textLink" href="/ayuda" data-reveal>Preguntas frecuentes <Icon name="arrow" size={18}/></StudioLink></div>
      <div className="studioPrinciples" data-reveal-group>{principles.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><Icon name="diagonal" size={18}/></div>)}</div>
    </section>
    <section className="support grain" data-parallax-box>
      <div className="supportBackdrop" aria-hidden="true"><Media src="/assets/los-santos-sunset.jpg" alt="" sizes="100vw" parallax={0.1} position="50% 60%"/></div>
      <div className="supportInner">
        <p className="kicker kickerLight" data-reveal="fade">A medida</p>
        <h2 data-split>Hagamos algo tuyo.</h2>
        <p className="supportCopy" data-reveal>Cuéntanos qué quieres construir, en qué entorno y con qué referencias. Respondemos con alcance, plazos y disponibilidad.</p>
        <div className="supportActions" data-reveal-group><a className="button lightButton" href="mailto:hola@gente.arts?subject=Tengo%20una%20idea">Cuéntanos tu idea <Icon name="diagonal"/></a><StudioLink className="button ghostButton" href="/gta-v">Explorar GTA V <Icon name="arrow"/></StudioLink></div>
      </div>
    </section>
    <ScrollMotion/>
  </main>;
}
