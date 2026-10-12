import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteShell";

export const metadata = { title:"GTA VI — Próximamente | GENTE.ARTS", description:"La próxima colección de recursos GENTE.ARTS para GTA VI." };

export default function GtaViPage() {
  return <><SiteHeader/><main className="gtaViPage">
    <section className="catalogHero gtaViHero">
      <Image src="/assets/gta-vi-art.jpg" alt="Universo GTA VI" fill priority sizes="100vw"/>
      <div className="catalogHeroShade"/><div className="catalogHeroTop"><Link href="/">← VOLVER</Link><span>02 / NEXT UNIVERSE</span></div>
      <div className="catalogHeroCopy"><p className="kicker"><span/> GENTE.ARTS / GTA VI</p><h1>GTA VI</h1><p>La próxima generación está tomando forma.</p><a href="#proximamente">DESCUBRIR ↓</a></div>
    </section>
    <section className="viComing" id="proximamente"><div className="viIndex">06</div><div className="viCopy"><p className="kicker dark"><span/> COLECCIÓN EN DESARROLLO</p><h2>Próximamente.</h2><p>Aún no hay productos publicados. Estamos construyendo una colección específica para el nuevo universo: limpia, útil y sin relleno.</p><form><label htmlFor="vi-email">RECIBE EL PRIMER AVISO</label><div><input id="vi-email" type="email" placeholder="TU EMAIL"/><button type="button">AVÍSAME ↗</button></div></form><Link href="/gta-v">MIENTRAS TANTO, VER GTA V ↗</Link></div></section>
  </main><SiteFooter/></>;
}
