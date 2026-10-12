import Image from "next/image";
import Link from "next/link";
import UniversePortal from "../components/UniversePortal";
import { SiteFooter, SiteHeader } from "../components/SiteShell";

export default function Home() {
  return <>
    <SiteHeader />
    <main id="top">
      <section className="brandHero" id="inicio">
        <div className="brandHeroMeta"><span>DIGITAL GOODS / OPEN WORLDS</span><span>GENTE.ARTS® / 2026</span></div>
        <img src="/brand/gente-arts-estela.webp" alt="La estela de color se transforma en el logotipo GENTE.ARTS" fetchPriority="high" />
        <div className="brandHeroFoot"><p>Recursos con identidad para comunidades que quieren construir algo propio.</p><a href="#universos">ELEGIR UNIVERSO <b>↘</b></a></div>
      </section>
      <UniversePortal />

      <section className="featureSplit">
        <div className="featureArt"><Image src="/assets/gta-v-art.jpg" alt="Ilustración de una ciudad inspirada en GTA V" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="featureCopy"><p className="kicker dark"><span/> ECOSISTEMA GENTE.ARTS</p><h2>Hecho para<br/>encajar.</h2><p>Dos universos, una dirección creativa. Entra en GTA V para descubrir la colección disponible o mira lo que estamos preparando para GTA VI.</p><div className="featureLinks"><Link href="/gta-v">ENTRAR EN GTA V <b>↗</b></Link><Link href="/gta-vi">DESCUBRIR GTA VI <b>↗</b></Link></div></div>
      </section>

      <section className="support" id="soporte"><p className="kicker dark"><span/> CUSTOM WORK</p><h2>¿Buscas algo<br/>que aún no existe?</h2><a className="button darkButton" href="mailto:hola@gente.arts">HABLEMOS <b>↗</b></a></section>
    </main>
    <SiteFooter />
  </>;
}
