import StudioLink from "./StudioLink";
import Brand from "./Brand";
import Navigation from "./Navigation";
import Icon from "./Icon";
import ScrollMotion from "./motion/ScrollMotion";

export function SiteHeader() {
  return <><div className="announcement"><span>DISEÑO DIGITAL. MUNDOS CON IDENTIDAD.</span><span className="announcementRight">GTA V <i/> GTA VI PRÓXIMAMENTE</span></div><Navigation/></>;
}

export function SiteFooter() {
  return <footer className="siteFooter">
    <div className="footerTop">
      <div data-reveal><Brand footer/><p>Piezas digitales.<br/>Posibilidades abiertas.</p></div>
      <div className="footerLinks" data-reveal-group><div><h3>EXPLORA</h3><StudioLink href="/gta-v">GTA V <Icon name="diagonal" size={14}/></StudioLink><StudioLink href="/gta-vi">GTA VI <span>Próximamente</span></StudioLink><StudioLink href="/#universos">Universos</StudioLink></div><div><h3>HABLEMOS</h3><StudioLink href="/ayuda">Ayuda y preguntas</StudioLink><StudioLink href="/ayuda#licencias">Sobre las licencias</StudioLink><a href="mailto:hola@gente.arts">hola@gente.arts <Icon name="diagonal" size={14}/></a></div></div>
    </div>
    <p className="footerGiant" aria-hidden="true" data-split>GENTE.ARTS</p>
    <div className="footerBottom"><span>© 2026 GENTE.ARTS</span><p>Tienda independiente. Sin afiliación con Rockstar Games ni Take-Two Interactive. Ilustraciones y capturas promocionales © Rockstar Games.</p><a href="#inicio" aria-label="Volver al principio">ARRIBA ↑</a></div>
    <ScrollMotion scope="footer"/>
  </footer>;
}
