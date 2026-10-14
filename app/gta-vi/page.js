import Media from "../../components/Media";
import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";

export const metadata = { title: "GTA VI — Próximamente | GENTE.ARTS", description: "El siguiente capítulo de GENTE.ARTS. Colección GTA VI próximamente.", alternates: { canonical: "/gta-vi" } };

export default function GtaViPage() {
  return <main id="contenido">
    <section className="catalogHero gtaViHero">
      <Media src="/assets/gta-vi-art.jpg" alt="Ilustración del universo GTA VI" eager/>
      <div className="catalogHeroShade"/><div className="catalogHeroTop"><StudioLink href="/"><Icon name="back" size={16}/> Universos</StudioLink><span>02 / EL SIGUIENTE CAPÍTULO</span></div>
      <div className="catalogHeroCopy"><div><p className="eyebrow">NUEVOS LUGARES. NUEVAS IDEAS.</p><h1>GTA VI<span>.</span></h1></div><span className="glassPill"><i/> PRÓXIMAMENTE</span></div>
    </section>
    <section className="viComing"><div className="viOrbit" aria-hidden="true"><span>VI</span><i/><b>GENTE.ARTS / NEXT CHAPTER</b></div><div className="viCopy"><p className="eyebrow"><span className="colorDash"/> TRABAJANDO EN LO QUE VIENE</p><h2>Otro mundo.<br/><em>La misma esencia.</em></h2><p>La colección de GTA VI tendrá su propio espacio aquí. Todavía no hay productos ni fecha de apertura.</p><a className="button darkButton" href="mailto:hola@gente.arts?subject=Consulta%20sobre%20la%20colecci%C3%B3n%20GTA%20VI">Preguntar por la colección <Icon name="diagonal"/></a><StudioLink className="textLink" href="/gta-v">Mientras tanto, explora GTA V <Icon name="arrow" size={18}/></StudioLink></div></section>
  </main>;
}
