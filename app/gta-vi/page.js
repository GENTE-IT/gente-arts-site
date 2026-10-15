import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import ScrollMotion from "../../components/motion/ScrollMotion";

export const metadata = { title: "GTA VI — Próximamente", description: "El siguiente capítulo de GENTE.ARTS. Colección GTA VI próximamente.", alternates: { canonical: "/gta-vi" } };

const plans = [
  ["01", "Mapeados para Leonida", "Espacios con identidad para Vice City y más allá, diseñados desde el primer día para el nuevo motor."],
  ["02", "Sistemas y scripts", "Interfaces y flujos pensados para la nueva generación de servidores, con el mismo cuidado por el rendimiento."],
  ["03", "Ropa y estilo", "Colecciones que acompañan la estética de Vice City: color, calor y carácter."],
];

export default function GtaViPage() {
  return <main id="contenido">
    <section className="catalogHero gtaViHero" data-parallax-box>
      <Media src="/assets/gta-vi-key.jpg" alt="Ilustración oficial del universo GTA VI" eager parallax={0.1} position="50% 35%"/>
      <div className="catalogHeroShade"/><div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>02 · El siguiente capítulo</span></div>
      <div className="catalogHeroCopy"><div><p className="kicker kickerLight" data-reveal="fade">Nuevos lugares, nuevas ideas</p><h1 data-split>GTA VI.</h1></div><span className="glassPill" data-reveal><i/> Próximamente</span></div>
    </section>
    <section className="viComing">
      <div className="viVisual" data-parallax-box data-reveal="clip"><Media src="/assets/gta-vi-portrait.jpg" alt="Personajes de GTA VI en el puerto de Vice City" sizes="(max-width: 800px) 100vw, 45vw" parallax={0.08}/><span className="viStamp">Leonida<br/>2026</span></div>
      <div className="viCopy"><p className="kicker" data-reveal="fade">Trabajando en lo que viene</p><h2 data-split>Otro mundo. La misma esencia.</h2><p data-reveal>La colección de GTA VI tendrá su propio espacio aquí. Todavía no hay productos ni fecha de apertura, pero ya estamos preparando las primeras piezas.</p><div className="viPlans" data-reveal-group>{plans.map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="viActions" data-reveal-group><a className="button darkButton" href="mailto:hola@gente.arts?subject=Consulta%20sobre%20la%20colecci%C3%B3n%20GTA%20VI">Preguntar por la colección <Icon name="diagonal"/></a><StudioLink className="textLink" href="/gta-v">Mientras tanto, explora GTA V <Icon name="arrow" size={18}/></StudioLink></div></div>
    </section>
    <section className="viBand" data-parallax-box>
      <div className="viBandMedia"><Media src="/assets/gta-vi-leonida.jpg" alt="Dos personajes de GTA VI frente a una gasolinera al atardecer" sizes="100vw" parallax={0.12} position="50% 55%"/></div>
      <div className="viBandCopy"><p className="kicker kickerLight" data-reveal="fade">Vice City, USA</p><h2 data-split>Nos vemos en Leonida.</h2></div>
    </section>
    <ScrollMotion/>
  </main>;
}
