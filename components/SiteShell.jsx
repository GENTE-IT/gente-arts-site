import StudioLink from "./StudioLink";
import Brand from "./Brand";
import Navigation from "./Navigation";
import Icon from "./Icon";
import Figures from "./brand/Figures";
import Stripes from "./brand/Stripes";
import ScrollMotion from "./motion/ScrollMotion";
import SocialLinks from "./SocialLinks";

export function SiteHeader() {
  return <><div className="announcement"><span>Acceso digital inmediato tras la activación. Soporte por email.</span><span className="announcementRight">GTA V <i/> GTA VI en preparación</span></div><Navigation/></>;
}

export function SiteFooter() {
  return <footer className="siteFooter grain">
    <div className="footerTop">
      <div className="footerBrand" data-reveal><Brand footer height={30}/><p>Piezas digitales.<br/>Posibilidades abiertas.</p><Stripes width={44}/><SocialLinks/></div>
      <div className="footerLinks" data-reveal-group><div><h3>Explora</h3><StudioLink href="/gta-v">GTA V <Icon name="diagonal" size={14}/></StudioLink><StudioLink href="/gta-vi">GTA VI <span>Próximamente</span></StudioLink><StudioLink href="/#como-funciona">Cómo funciona</StudioLink></div><div><h3>Hablemos</h3><StudioLink href="/ayuda">Ayuda y preguntas</StudioLink><StudioLink href="/ayuda#licencias">Sobre las licencias</StudioLink><a href="mailto:hola@gente.arts">hola@gente.arts <Icon name="diagonal" size={14}/></a></div></div>
      <Figures className="footerFigures" height={170}/>
    </div>
    <div className="footerBottom"><span>© 2026 GENTE.ARTS</span><p>Tienda independiente. Sin afiliación con Rockstar Games ni Take-Two Interactive. Ilustraciones y capturas promocionales © Rockstar Games.</p><a href="#inicio" aria-label="Volver al principio">Arriba ↑</a></div>
    <ScrollMotion scope="footer"/>
  </footer>;
}
