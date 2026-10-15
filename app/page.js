import BrandHero from "../components/BrandHero";
import Marquee from "../components/Marquee";
import UniversePortal from "../components/UniversePortal";
import Manifesto from "../components/Manifesto";
import FeaturedRail from "../components/FeaturedRail";
import Media from "../components/Media";
import StudioLink from "../components/StudioLink";
import Icon from "../components/Icon";
import ScrollMotion from "../components/motion/ScrollMotion";
import { featuredProducts } from "../data/products";

const principles = [
  ["01", "Identidad propia.", "Recursos para dar forma al lugar que imaginas, no plantillas que se repiten en cada servidor."],
  ["02", "Cada pieza cuenta.", "Desde un espacio hasta una interfaz. Todo forma parte de la experiencia y se diseña con el mismo cuidado."],
  ["03", "Rendimiento primero.", "Colisiones revisadas, LOD optimizado y código organizado para que el detalle no cueste frames."],
  ["04", "Hablemos de tu idea.", "¿Tienes algo en mente? Cuéntanos qué quieres construir y lo convertimos en una pieza a medida."],
];

export default function Home() {
  return <main id="contenido">
    <BrandHero/>
    <Marquee/>
    <UniversePortal/>
    <Manifesto/>
    <FeaturedRail products={featuredProducts}/>
    <section className="studioSection" id="estudio">
      <div className="studioIntro"><p className="eyebrow" data-reveal="fade"><span className="colorDash"/> EL ESTUDIO</p><h2 data-split>El detalle lo cambia todo.</h2><p className="studioLead" data-reveal>Diseñamos recursos para GTA V y FiveM como si fueran productos: con criterio, documentación y soporte directo.</p><StudioLink className="textLink" href="/ayuda" data-reveal>Conoce cómo trabajamos <Icon name="arrow" size={18}/></StudioLink></div>
      <div className="studioPrinciples" data-reveal-group>{principles.map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Icon name="diagonal" size={18}/></div>)}</div>
    </section>
    <section className="support" data-parallax-box>
      <div className="supportBackdrop" aria-hidden="true"><Media src="/assets/los-santos-sunset.jpg" alt="" sizes="100vw" parallax={0.1} position="50% 60%"/></div>
      <div className="supportInner">
        <p className="eyebrow" data-reveal="fade"><span className="colorDash"/> DE IDEA A UNIVERSO</p>
        <h2 data-split>Hagamos algo tuyo.</h2>
        <p className="supportCopy" data-reveal>Cuéntanos qué quieres construir, en qué entorno y con qué referencias. Respondemos con alcance, plazos y disponibilidad.</p>
        <div className="supportActions" data-reveal-group><a className="button lightButton" href="mailto:hola@gente.arts?subject=Tengo%20una%20idea">Cuéntanos tu idea <Icon name="diagonal"/></a><StudioLink className="button ghostButton" href="/gta-v">Explorar GTA V <Icon name="arrow"/></StudioLink></div>
        <p className="supportMail" data-reveal="fade">hola@gente.arts</p>
      </div>
    </section>
    <ScrollMotion/>
  </main>;
}
