import StudioLink from "./StudioLink";
import Brand from "./Brand";
import Navigation from "./Navigation";
import Icon from "./Icon";

export function SiteHeader() {
  return <><div className="announcement"><span>DISEÑO DIGITAL. MUNDOS CON IDENTIDAD.</span><span className="announcementRight">GTA V <i/> GTA VI PRÓXIMAMENTE</span></div><Navigation/></>;
}

export function SiteFooter() {
  return <footer className="siteFooter">
    <div className="footerTop"><div><Brand footer/><p>Piezas digitales.<br/>Posibilidades abiertas.</p></div><div className="footerLinks"><div><h3>EXPLORA</h3><StudioLink href="/gta-v">GTA V <Icon name="diagonal" size={14}/></StudioLink><StudioLink href="/gta-vi">GTA VI <span>Próximamente</span></StudioLink></div><div><h3>HABLEMOS</h3><StudioLink href="/ayuda">Ayuda y preguntas</StudioLink><StudioLink href="/ayuda#licencias">Sobre las licencias</StudioLink><a href="mailto:hola@gente.arts">hola@gente.arts <Icon name="diagonal" size={14}/></a></div></div></div>
    <div className="footerBottom"><span>© 2026 GENTE.ARTS</span><p>Tienda independiente. Sin afiliación con Rockstar Games ni Take-Two Interactive. Ilustraciones promocionales © Rockstar Games.</p><a href="#contenido" aria-label="Volver al principio">ARRIBA ↑</a></div>
  </footer>;
}
