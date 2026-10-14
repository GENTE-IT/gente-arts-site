"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./Brand";
import StudioLink from "./StudioLink";
import Icon from "./Icon";
import Dialog from "./Dialog";
import { useShop } from "./ShopProvider";

const links = [["/", "Inicio"], ["/gta-v", "GTA V"], ["/gta-vi", "GTA VI"], ["/ayuda", "Ayuda"]];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useShop();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  return <header className="siteHeader">
    <Brand/>
    <nav className="desktopNav" aria-label="Navegación principal">{links.map(([href, label]) => <StudioLink key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}{href === "/gta-vi" && <span className="navDot"/>}</StudioLink>)}</nav>
    <div className="headerActions"><a className="contactLink" href="mailto:hola@gente.arts">Hablemos <Icon name="diagonal" size={15}/></a><button className="cartTrigger" onClick={openCart} aria-label={`Abrir cesta, ${cart.length} recursos`}><Icon name="bag" size={18}/><span>{cart.length}</span></button><button className="iconButton menuTrigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-haspopup="dialog" aria-expanded={menuOpen}><Icon name="menu"/></button></div>
    {menuOpen && <Dialog className="menuDialog" labelId="menu-title" onClose={() => setMenuOpen(false)}><div className="menuInner"><div className="menuTop"><p id="menu-title" className="eyebrow">GENTE.ARTS / EXPLORAR</p><button className="iconButton" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><Icon name="close"/></button></div><nav aria-label="Navegación móvil">{links.map(([href, label], index) => <StudioLink key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Icon name="diagonal"/></StudioLink>)}</nav><a className="menuContact" href="mailto:hola@gente.arts">hola@gente.arts <Icon name="diagonal"/></a></div></Dialog>}
  </header>;
}
