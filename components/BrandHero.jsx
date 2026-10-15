"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import HeroField from "./HeroField";
import Logo from "./brand/Logo";
import Figures from "./brand/Figures";
import Icon from "./Icon";
import StudioLink from "./StudioLink";

/*
 * Opening scene built around the brand: the vector wordmark and the figures
 * over an interactive dot field. The intro lifts the mark in; scroll then
 * parallaxes it away while the copy fades.
 */
export default function BrandHero() {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      intro
        .from(".heroMark", { y: 70, autoAlpha: 0, duration: 1.4 }, 0)
        .from(".heroMark svg", { yPercent: 45, autoAlpha: 0, duration: 1.3, stagger: 0.16 }, 0.1)
        .from(".heroFigures", { x: -50, autoAlpha: 0, duration: 1.4 }, 0.35)
        .from(".heroMeta > *", { y: -12, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.7)
        .from(".heroRule", { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, 0.8)
        .from(".heroFoot > *", { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.9);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroStage", { yPercent: 26, ease: "none" }, 0)
        .to(".heroFoot, .heroMeta", { autoAlpha: 0, y: -30, ease: "none" }, 0)
        .to(".heroField", { autoAlpha: 0.3, ease: "none" }, 0);
    });
  }, { scope: root });

  return <section className="brandHero grain" id="inicio" ref={root}>
    <HeroField/>
    <div className="heroMeta"><span><i className="kickerDot"/>Estudio creativo digital</span><span>Vol. 01 · GTA V / GTA VI</span><span>Tarjetas de acceso a recursos</span></div>
    <div className="heroStage">
      <Figures className="heroFigures" height={340}/>
      <h1 className="heroMark"><Logo stacked height={150} title="GENTE.ARTS"/></h1>
    </div>
    <div className="heroRule" aria-hidden="true"/>
    <div className="heroFoot">
      <p className="heroClaim">Tu mundo.<br/><em>Tu manera.</em></p>
      <p className="heroLead">Mapeados, scripts, sistemas y ropa para servidores de GTA V, entregados como tarjetas de acceso. Compras la tarjeta, la activas y descargas los archivos.</p>
      <div className="heroActions"><StudioLink className="button lightButton" href="/gta-v#catalogo">Ver la colección <Icon name="arrow"/></StudioLink><a className="button ghostButton" href="#como-funciona">Cómo funciona <Icon name="down"/></a></div>
    </div>
  </section>;
}
