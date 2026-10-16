import StudioLink from "./StudioLink";
import Brand from "./Brand";
import Navigation from "./Navigation";
import Icon from "./Icon";
import ScrollMotion from "./motion/ScrollMotion";
import SocialLinks from "./SocialLinks";
import { email, domain, legal } from "../data/site";

export function SiteHeader() {
  return <><div className="announcement"><span>Scripts, mapeados y ropa para servidores de rol. Soporte por ticket y email.</span><span className="announcementRight">GTA V (FiveM) <i/> Preparamos contenido para GTA VI</span></div><Navigation/></>;
}

export function SiteFooter() {
  return <footer className="siteFooter">
    <div className="footerTop">
      <div className="footerBrand" data-reveal><Brand footer/><p>Hecho por gente,<br/>para tu servidor.</p><SocialLinks/></div>
      <div className="footerLinks" data-reveal-group>
        <div><h3>Tienda</h3><StudioLink href="/gta-v">GTA V <Icon name="diagonal" size={14}/></StudioLink><StudioLink href="/gta-vi">GTA VI <span>En preparación</span></StudioLink><StudioLink href="/#como-funciona">Cómo funciona</StudioLink></div>
        <div><h3>Soporte</h3><StudioLink href="/ayuda">Ayuda y preguntas</StudioLink><StudioLink href="/ayuda#licencias">Licencias</StudioLink><a href={`mailto:${email}`}><code>{email}</code></a></div>
      </div>
    </div>
    <div className="footerBottom"><span>© 2026 GENTE.ARTS · {domain}</span><p>{legal}</p><a href="#inicio" aria-label="Volver al principio">Arriba <Icon name="up" size={12}/></a></div>
    <ScrollMotion scope="footer"/>
  </footer>;
}
