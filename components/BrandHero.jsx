"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import FoldText from "./reactbits/FoldText";
import Lightfall from "./reactbits/Lightfall";
import Raya from "./brand/Raya";
import Icon from "./Icon";
import StudioLink from "./StudioLink";
import { useTheme } from "./ThemeProvider";

/*
 * Portada (manual, ch. 15): headline in Unbounded 800, the dupla large on the
 * right standing on a raya that crosses the whole screen. The headline unfolds
 * word by word (FoldText) and the dupla folds open the same way, refolding
 * near the pointer. Behind it, a faint fall of white light (Lightfall).
 */
export default function BrandHero() {
  const root = useRef(null);
  const { theme } = useTheme();
  const dark = theme !== "light";
  useGSAP((context, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const dupla = el.querySelector(".heroDupla");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(dupla, { rotationX: -92, autoAlpha: 0, transformOrigin: "50% 0%" }, { rotationX: 0, autoAlpha: 1, duration: 1.1 }, 0.1)
        .from(".heroCopy > :not(.heroTitle)", { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from(".heroRaya", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: "power3.inOut" }, 0.2);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroStage", { yPercent: 14, autoAlpha: 0.3, ease: "none" }, 0)
        .to(".heroLight", { autoAlpha: 0.2, ease: "none" }, 0)
        .to(".heroCopy", { autoAlpha: 0, y: -30, ease: "none" }, 0);

      // Hover refold, same rule as FoldText: within 160px the panel folds up to 40deg.
      const RADIUS = 160, ANGLE = 40;
      const fold = gsap.quickTo(dupla, "rotationX", { duration: 0.45, ease: "power2.out" });
      const move = contextSafe(event => {
        if (intro.isActive()) return;
        const r = dupla.getBoundingClientRect();
        const dx = Math.max(r.left - event.clientX, 0, event.clientX - r.right);
        const dy = Math.max(r.top - event.clientY, 0, event.clientY - r.bottom);
        const d = Math.hypot(dx, dy) / RADIUS;
        const aim = d < 1 ? 1 - d * d * (3 - 2 * d) : 0;
        fold(-ANGLE * aim);
      });
      const leave = contextSafe(() => fold(0));
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
    });
  }, { scope: root });

  return <section className="brandHero" id="inicio" ref={root}>
    <div className="heroLight" aria-hidden="true"><Lightfall lightMode={!dark} colors={dark ? ["#ffffff", "#ffffff", "#ffffff", "#8C9099"] : ["#0A0A0C", "#0A0A0C", "#8C9099"]} backgroundColor="#0A0A0C" speed={0.22} streakCount={2} streakWidth={0.8} streakLength={1} twinkle={0.2} backgroundGlow={0} headGlow={0.4} bloom={0.25} depth={0.5} fade={0.3} opacity={dark ? 0.55 : 0.4} mouseInteraction intro/></div>
    <div className="heroCopy">
      <p className="kicker" data-reveal="fade">Estudio · GTA V (FiveM) · GTA VI</p>
      <h1 className="heroTitle"><span className="srOnly">Hecho por gente, para tu servidor.</span><FoldText text="Hecho por gente, para tu servidor." foldStyle="paper" splitBy="word" hinge="top" trigger="mount" foldAngle={92} duration={0.7} stagger={0.08} staggerFrom="start" ease="power3.out" hoverRefold refoldRadius={160} refoldAngle={40} perspective={900} creaseShading={0.4} fontSize="var(--text-display)" fontWeight={800} aria-hidden="true"/></h1>
      <p className="heroLead">Scripts, mapeados y ropa para servidores de rol. Funcionan a la primera, están documentados y se actualizan cuando cambian los frameworks.</p>
      <div className="heroActions"><StudioLink className="button primaryButton" href="/gta-v#catalogo">Ver la tienda <Icon name="arrow"/></StudioLink><a className="button outlineButton" href="#como-funciona">Cómo funciona <Icon name="down"/></a></div>
    </div>
    <div className="heroStage"><div className="heroDuplaStage"><img src="/brand/isotipo.png" alt="" className="heroDupla" draggable={false}/></div></div>
    <Raya className="heroRaya"/>
  </section>;
}
