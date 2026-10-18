"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import JellyRadio from "./reactbits/JellyRadio";
import { gsap, ScrollTrigger, useGSAP } from "./motion/gsap";
import Brand from "./Brand";
import StudioLink from "./StudioLink";
import Icon from "./Icon";
import Dialog from "./Dialog";
import { useShop } from "./ShopProvider";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";
import { email } from "../data/site";

const links = [["/", "Inicio"], ["/gta-v", "GTA V"], ["/gta-vi", "GTA VI"], ["/ayuda", "Ayuda"]];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const header = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useShop();
  // Close the menu whenever the route changes. Adjusting state during render (instead of in an
  // effect) avoids a render with the menu still open on the new page. Keep it out of an effect.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }
  // The jelly chips are buttons, so prefetch what Link would have prefetched.
  useEffect(() => { links.forEach(([href]) => router.prefetch(href)); }, [router]);
  const navItems = links.map(([href, label]) => ({ value: href, label: href === "/gta-vi" ? <>{label}<span className="navDot"/></> : label }));
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
    <nav className="desktopNav" aria-label="Navegación principal"><JellyRadio items={navItems} value={links.some(([href]) => href === pathname) ? pathname : "/"} onChange={href => router.push(href)} ariaLabel="Secciones" chipColor="transparent" activeColor="var(--ink)" textColor="var(--nav-text)" activeTextColor="var(--ink-contrast)" size="md" gap={2} radius={8} swell={0.16} barge={4} shrink={0.04} jelly={1} bounce={0.28} stagger={20} stiffness={560}/></nav>
    <div className="headerActions"><StudioLink className="button primaryButton storeButton" href="/gta-v#catalogo">Tienda</StudioLink><ThemeToggle/><button className="cartTrigger" onClick={openCart} aria-label={`Abrir cesta, ${cart.length} recursos`}><Icon name="bag" size={17}/><span>{cart.length}</span></button><button className="iconButton menuTrigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú" aria-haspopup="dialog" aria-expanded={menuOpen}><Icon name="menu"/></button></div>
    {menuOpen && <Dialog className="menuDialog" labelId="menu-title" onClose={() => setMenuOpen(false)}><div className="menuInner"><div className="menuTop"><p id="menu-title" className="kicker">Explorar</p><button className="iconButton" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><Icon name="close"/></button></div><nav aria-label="Navegación móvil">{links.map(([href, label], index) => <StudioLink key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Icon name="diagonal"/></StudioLink>)}</nav><a className="menuContact" href={`mailto:${email}`}>hola@gente.arts <Icon name="diagonal"/></a><SocialLinks compact className="menuSocial"/></div></Dialog>}
  </header>;
}
