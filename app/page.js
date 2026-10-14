import BrandHero from "../components/BrandHero";
import UniversePortal from "../components/UniversePortal";
import ScrollWordReveal from "../components/ScrollWordReveal";
import StudioLink from "../components/StudioLink";
import Icon from "../components/Icon";

export default function Home() {
  return <main id="contenido">
    <BrandHero/>
    <div className="brandStrip" aria-label="Especialidades del estudio"><span>MAPEADOS</span><i/><span>SCRIPTS</span><i/><span>ROPA</span><i/><span>OTRAS FORMAS DE CREAR</span><Icon name="diagonal" size={17}/></div>
    <UniversePortal/>
    <ScrollWordReveal/>
    <section className="studioSection">
      <div className="studioIntro"><p className="eyebrow"><span className="colorDash"/> EL ESTUDIO</p><h2>El detalle<br/>lo cambia todo.</h2><StudioLink href="/ayuda" className="textLink">Conoce cómo funciona <Icon name="diagonal" size={18}/></StudioLink></div>
      <div className="studioPrinciples">{[["01", "Identidad propia.", "Recursos para dar forma al lugar que imaginas."], ["02", "Cada pieza cuenta.", "Desde un espacio hasta una interfaz. Todo forma parte de la experiencia."], ["03", "Hablemos de tu idea.", "¿Tienes algo en mente? Cuéntanos qué quieres construir."]].map(([number, title, copy]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><Icon name="plus" size={18}/></div>)}</div>
    </section>
    <section className="support" id="soporte"><p className="eyebrow"><span className="statusDot"/> DE IDEA A UNIVERSO</p><h2>Hagamos<br/><em>algo tuyo.</em></h2><a className="button darkButton" href="mailto:hola@gente.arts">Cuéntanos tu idea <Icon name="diagonal"/></a><p className="supportMail">hola@gente.arts</p></section>
  </main>;
}
