import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import ScrollMotion from "../../components/motion/ScrollMotion";
import Raya from "../../components/brand/Raya";
import { email } from "../../data/site";

export const metadata = { title: "GTA VI — En preparación", description: "Preparamos contenido para GTA VI: mapeados, scripts y ropa, con la misma forma de trabajar que en GTA V.", alternates: { canonical: "/gta-vi" } };

const plans = [
  ["01", "Mapeados para Leonida", "Espacios con identidad para Vice City y más allá, diseñados desde el primer día para el nuevo motor."],
  ["02", "Sistemas y scripts", "Interfaces y flujos pensados para la nueva generación de servidores, con el mismo cuidado por el rendimiento."],
  ["03", "Ropa y estilo", "Colecciones que acompañan la estética de Vice City: color, calor y carácter."],
];

export default function GtaViPage() {
  return <main id="contenido">
    <section className="catalogHero gtaViHero" data-parallax-box>
      <Media src="/assets/gta-vi-hero.jpg" alt="Jason y Lucía, ilustración oficial de GTA VI" eager parallax={0.1} scale position="50% 30%"/>
      <div className="catalogHeroShade"/><div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>02 · El siguiente capítulo</span></div>
      <div className="catalogHeroCopy"><div><p className="kicker kickerLight" data-reveal="fade">Nuevos lugares, nuevas ideas</p><h1 data-split>GTA VI.</h1></div><span className="glassPill" data-reveal>Próximamente</span></div>
      <Raya className="heroRaya"/>
    </section>
    <section className="viComing">
      <div className="viVisual" data-parallax-box data-img-reveal><Media src="/assets/gta-vi-portrait.jpg" alt="Personajes de GTA VI en el puerto de Vice City" sizes="(max-width: 800px) 100vw, 45vw" parallax={0.08}/><span className="viStamp">Leonida<br/>Vice City</span></div>
      <div className="viCopy"><p className="kicker" data-reveal="fade">Qué estamos preparando</p><h2 data-split>Otro mundo. La misma forma de trabajar.</h2><p data-reveal>Preparamos contenido para GTA VI. Todavía no hay productos ni fechas: lo que no está probado no se anuncia. Cuando haya algo que enseñar, estará aquí.</p><div className="viPlans" data-reveal-group>{plans.map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="viActions" data-reveal-group><a className="button primaryButton" href={`mailto:${email}?subject=GTA%20VI`}>Preguntar por GTA VI <Icon name="diagonal"/></a><StudioLink className="textLink" href="/gta-v">Mientras tanto, la tienda de GTA V <Icon name="arrow" size={18}/></StudioLink></div></div>
    </section>
    <section className="viBand" data-parallax-box>
      <div className="viBandMedia" data-img-reveal="right"><Media src="/assets/gta-vi-leonida.jpg" alt="Dos personajes de GTA VI frente a una gasolinera al atardecer" sizes="100vw" parallax={0.12} position="50% 55%"/></div>
      <div className="viBandCopy"><p className="kicker kickerLight" data-reveal="fade">Vice City, USA</p><h2 data-split>Nos vemos en Leonida.</h2></div>
    </section>
    <ScrollMotion/>
  </main>;
}
