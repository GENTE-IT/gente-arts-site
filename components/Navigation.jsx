"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./motion/gsap";
import Brand from "./Brand";
import StudioLink from "./StudioLink";
import Icon from "./Icon";
import Dialog from "./Dialog";
import { useShop } from "./ShopProvider";

const links = [["/", "Inicio"], ["/gta-v", "GTA V"], ["/gta-vi", "GTA VI"], ["/ayuda", "Ayuda"]];

export default function Navigation() {
  const pathname = usePathname();
  const header = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useShop();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useGSAP(() => {
    // Compact header after the first screen; hide on fast downward scroll, show on upward scroll.
    ScrollTrigger.create({ start: "top -40px", end: "max", toggleClass: { targets: header.current, className: "isScrolled" } });
    const show = gsap.quickTo(header.current, "yPercent", { duration: 0.45, ease: "power3.out" });
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: self => { if (self.direction === 1 && self.scroll() > 320 && self.getVelocity() > 600) show(-100); else if (self.direction === -1) show(0); },
    });
  }, { scope: header });
  return <header className="siteHeader" ref={header}>
    <Brand/>
    <nav className="desktopNav" aria-label="Navegación principal">{links.map(([href, label]) => <StudioLink key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}{href === "/gta-vi" && <span className="navDot"/>}</StudioLink>)}</nav>
    <div className="headerActions"><a className="contactLink" href="mailto:hola@gente.arts">Hablemos <Icon name="diagonal" size={15}/></a><button className="cartTrigger" onClick={openCart} aria-label={`Abrir cesta, ${cart.length} recursos`}><Icon name="bag" size={17}/><span>{cart.length}</span></button><button className="iconButton menuTrigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-haspopup="dialog" aria-expanded={menuOpen}><Icon name="menu"/></button></div>
    {menuOpen && <Dialog className="menuDialog" labelId="menu-title" onClose={() => setMenuOpen(false)}><div className="menuInner"><div className="menuTop"><p id="menu-title" className="eyebrow">GENTE.ARTS / EXPLORAR</p><button className="iconButton" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><Icon name="close"/></button></div><nav aria-label="Navegación móvil">{links.map(([href, label], index) => <StudioLink key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Icon name="diagonal"/></StudioLink>)}</nav><a className="menuContact" href="mailto:hola@gente.arts">hola@gente.arts <Icon name="diagonal"/></a></div></Dialog>}
  </header>;
}
