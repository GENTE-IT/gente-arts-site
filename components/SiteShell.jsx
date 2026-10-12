import Link from "next/link";
import Brand from "./Brand";

export function SiteHeader() {
  return <>
    <div className="announcement">ENTREGA INMEDIATA <i/> ACTUALIZACIONES INCLUIDAS <i/> SOPORTE DIRECTO</div>
    <header className="siteHeader">
      <Brand />
      <nav aria-label="Navegación principal"><Link href="/">Inicio</Link><Link href="/gta-v">GTA V</Link><Link href="/gta-vi">GTA VI</Link></nav>
      <Link className="headerContact" href="/#soporte">CONTACTO ↗</Link>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer><Brand footer/><div><h3>UNIVERSOS</h3><Link href="/gta-v">GTA V</Link><Link href="/gta-vi">GTA VI</Link></div><div><h3>AYUDA</h3><Link href="/#soporte">Soporte</Link><a href="#">Licencias</a><a href="#">FAQ</a></div><p>GENTE.ARTS es una tienda independiente y no está afiliada con Rockstar Games ni Take-Two Interactive. Ilustraciones promocionales © Rockstar Games.</p></footer>;
}
