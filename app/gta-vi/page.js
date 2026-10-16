import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import Dupla from "../../components/brand/Dupla";
import Raya from "../../components/brand/Raya";
import ScrollMotion from "../../components/motion/ScrollMotion";
import { email } from "../../data/site";

// GTA VI is spoken of in the future and without dates (manual, ch. 04 and 18):
// no third-party art, no promises of official support.
export const metadata = { title: "GTA VI — En preparación", description: "Preparamos contenido para GTA VI: mapeados, scripts y ropa, con la misma forma de trabajar que en GTA V.", alternates: { canonical: "/gta-vi" } };

const plans = [
  ["01", "Mapeados", "Espacios con identidad propia, pensados desde el primer día para el nuevo juego."],
  ["02", "Scripts", "Interfaces y flujos para la nueva generación de servidores, con el mismo cuidado por el rendimiento."],
  ["03", "Ropa", "Colecciones configurables, con variantes de color y optimizadas para el servidor."],
];

export default function GtaViPage() {
  return <main id="contenido">
    <section className="catalogHero catalogHeroFlat" data-parallax-box>
      <Dupla className="catalogHeroDupla"/>
      <div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>02 · En preparación</span></div>
      <div className="catalogHeroCopy"><div><p className="kicker kickerLight" data-reveal="fade">Lo siguiente</p><h1 data-split>GTA VI.</h1></div><span className="glassPill" data-reveal>Próximamente</span></div>
      <Raya className="heroRaya"/>
    </section>
    <section className="viComing">
      <div className="viCopy"><p className="kicker" data-reveal="fade">Qué estamos preparando</p><h2 data-split>Otro juego. La misma forma de trabajar.</h2><p data-reveal>Preparamos contenido para GTA VI. Todavía no hay productos ni fechas: lo que no está probado no se anuncia. Cuando haya algo que enseñar, estará aquí.</p><div className="viPlans" data-reveal-group>{plans.map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="viActions" data-reveal-group><a className="button primaryButton" href={`mailto:${email}?subject=GTA%20VI`}>Preguntar por GTA VI <Icon name="diagonal"/></a><StudioLink className="textLink" href="/gta-v">Mientras tanto, la tienda de GTA V <Icon name="arrow" size={18}/></StudioLink></div></div>
    </section>
    <ScrollMotion/>
  </main>;
}
