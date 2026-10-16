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
import { email } from "../data/site";

const principles = [
  ["Funciona a la primera", "Instalación documentada paso a paso. Si algo falla, abres ticket y lo miramos."],
  ["Al día con los frameworks", "Compatibilidad con ESX y QBCore probada antes de anunciarla. Versiones y dependencias, claras."],
  ["Acabado que se nota", "Interfaces y mapeados con un nivel visual que se ve dentro del juego, sin costar frames."],
];

export default function Home() {
  return <main id="contenido">
    <BrandHero/>
    <Marquee/>
    <UniversePortal/>
    <HowItWorks product={products.find(product => product.id === "velocity-mechanic")}/>
    <FeaturedRail products={featuredProducts}/>
    <Manifesto/>
    <section className="studioSection" id="estudio">
      <div className="studioIntro"><p className="kicker" data-reveal="fade">El estudio</p><h2 data-split>Pocas promesas, cumplidas.</h2><p className="studioLead" data-reveal>Somos un estudio de software y diseño. Hacemos scripts, mapeados y ropa para servidores de rol: primero GTA V (FiveM), después GTA VI.</p><StudioLink className="textLink" href="/ayuda" data-reveal>Preguntas frecuentes <Icon name="arrow" size={18}/></StudioLink></div>
      <div className="studioPrinciples" data-reveal-group>{principles.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><Icon name="diagonal" size={18}/></div>)}</div>
    </section>
    <section className="support grain" data-parallax-box>
      <div className="supportBackdrop" aria-hidden="true"><Media src="/assets/los-santos-sunset.jpg" alt="" sizes="100vw" parallax={0.1} position="50% 60%"/></div>
      <div className="supportInner">
        <p className="kicker kickerLight" data-reveal="fade">A medida</p>
        <h2 data-split>¿Necesitas algo a medida?</h2>
        <p className="supportCopy" data-reveal>Cuéntanos qué quieres construir, en qué framework y con qué referencias. Respondemos con alcance, plazo y precio.</p>
        <div className="supportActions" data-reveal-group><a className="button lightButton" href={`mailto:${email}?subject=Proyecto%20a%20medida`}>Cuéntanos tu idea <Icon name="diagonal"/></a><StudioLink className="button ghostButton" href="/gta-v">Ver la tienda <Icon name="arrow"/></StudioLink></div>
      </div>
    </section>
    <ScrollMotion/>
  </main>;
}
