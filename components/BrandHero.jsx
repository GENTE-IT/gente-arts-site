"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import FoldText from "./reactbits/FoldText";
import Lightfall from "./reactbits/Lightfall";
import Figures from "./brand/Figures";
import Icon from "./Icon";
import StudioLink from "./StudioLink";

/*
 * Opening scene on black: falling light (React Bits' Lightfall) behind the
 * wordmark set as type and unfolded letter by letter (FoldText, with hover
 * refold). The figures fold open the same way with GSAP and refold near the
 * pointer like the letters do. Two calls to action underneath.
 */
export default function BrandHero() {
  const root = useRef(null);
  useGSAP((context, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const figures = el.querySelector(".heroFigures");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(figures, { rotationX: -92, autoAlpha: 0, transformOrigin: "50% 0%" }, { rotationX: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.1)
        .from(".heroMeta > *", { y: -12, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from(".heroActions > *", { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroStage", { yPercent: 22, autoAlpha: 0.2, ease: "none" }, 0)
        .to(".heroLight", { autoAlpha: 0.35, ease: "none" }, 0)
        .to(".heroActions, .heroMeta", { autoAlpha: 0, y: -30, ease: "none" }, 0);

      // Hover refold, same rule as FoldText: within 160px the panel folds up to 40deg
      // (smoothstep falloff), snapping toward the pointer and easing back once it passes.
      const RADIUS = 160, ANGLE = 40;
      const fold = gsap.quickTo(figures, "rotationX", { duration: 0.45, ease: "power2.out" });
      const move = contextSafe(event => {
        if (intro.isActive()) return;
        const r = figures.getBoundingClientRect();
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
    <div className="heroLight" aria-hidden="true"><Lightfall colors={["#ffffff", "#ffffff", "#bfe3ff", "#f0b43c"]} backgroundColor="#3f8fb0" speed={0.26} streakCount={3} streakWidth={0.8} streakLength={1.1} twinkle={0.3} backgroundGlow={0.14} headGlow={0.6} bloom={0.4} depth={0.55} fade={0.3} opacity={0.9} mouseInteraction holdToWarp intro/></div>
    <h1 className="srOnly">GENTE.ARTS — Tu mundo. Tu manera.</h1>
    <div className="heroMeta"><span><i className="kickerDot"/>Estudio creativo digital</span><span>Vol. 01 · GTA V / GTA VI</span><span>Tarjetas de acceso a recursos</span></div>
    <div className="heroStage">
      <div className="heroFigureStage"><Figures className="heroFigures" height={340}/></div>
      <div className="heroMark" aria-hidden="true">
        <FoldText className="heroGente" text="GENTE." foldStyle="paper" splitBy="char" hinge="top" trigger="mount" foldAngle={92} duration={0.7} stagger={0.06} staggerFrom="start" ease="power3.out" hoverRefold refoldRadius={160} refoldAngle={40} perspective={900} creaseShading={0.5} fontSize="var(--mark-h)" fontWeight={900}/>
        <FoldText className="heroArts" text="ARTS" foldStyle="paper" splitBy="char" hinge="top" trigger="mount" foldAngle={92} duration={0.7} stagger={0.07} staggerFrom="start" ease="power3.out" hoverRefold refoldRadius={160} refoldAngle={40} perspective={900} creaseShading={0.35} fontSize="calc(var(--mark-h) * .82)" fontWeight={900}/>
      </div>
    </div>
    <div className="heroActions"><StudioLink className="button lightButton" href="/gta-v#catalogo">Ver la colección <Icon name="arrow"/></StudioLink><a className="button ghostButton" href="#como-funciona">Cómo funciona <Icon name="down"/></a></div>
  </section>;
}
