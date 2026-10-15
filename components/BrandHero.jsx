"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import FoldText from "./reactbits/FoldText";
import Figures from "./brand/Figures";
import Icon from "./Icon";
import StudioLink from "./StudioLink";

/*
 * Opening scene on black: the wordmark set as type and unfolded letter by
 * letter (React Bits' FoldText, with hover refold), the figures folding open
 * the same way with GSAP, and the two calls to action underneath.
 */
export default function BrandHero() {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".heroFigures", { rotationX: -92, autoAlpha: 0, transformOrigin: "50% 0%" }, { rotationX: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.1)
        .from(".heroMeta > *", { y: -12, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from(".heroActions > *", { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroStage", { yPercent: 22, autoAlpha: 0.2, ease: "none" }, 0)
        .to(".heroActions, .heroMeta", { autoAlpha: 0, y: -30, ease: "none" }, 0);
    });
  }, { scope: root });

  return <section className="brandHero" id="inicio" ref={root}>
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
