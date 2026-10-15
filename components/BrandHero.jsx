"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "./motion/gsap";
import AccessCard from "./AccessCard";
import Figures from "./brand/Figures";
import Icon from "./Icon";
import StudioLink from "./StudioLink";

/*
 * Opening scene: the claim on the left, the featured access card on the right.
 * The card settles in from a tilt, then scroll scrubs it away with parallax.
 */
export default function BrandHero({ product }) {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const title = SplitText.create(el.querySelector(".heroTitle"), { type: "lines,words", mask: "lines", linesClass: "splitLine", wordsClass: "splitWord" });
      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      intro
        .from(title.words, { yPercent: 110, duration: 1.2, stagger: 0.05 }, 0)
        .from(".heroKicker, .heroLead, .heroActions > *", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.35)
        .from(".heroCard", { y: 80, rotation: 8, autoAlpha: 0, duration: 1.5, ease: "power3.out" }, 0.2)
        .from(".heroCard .cardBody", { rotationY: -35, rotationX: 12, duration: 1.8, ease: "power3.out" }, 0.2)
        .from(".heroFigures", { x: 40, autoAlpha: 0, duration: 1.2 }, 0.8)
        .from(".heroMeta > *", { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.1 }, 0.9);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroCard", { yPercent: 30, rotation: -6, ease: "none" }, 0)
        .to(".heroCopy", { yPercent: 18, autoAlpha: 0, ease: "none" }, 0)
        .to(".heroFigures", { yPercent: 60, ease: "none" }, 0);
      return () => title.revert();
    });
  }, { scope: root });

  return <section className="brandHero grain" id="inicio" ref={root}>
    <div className="heroCopy">
      <p className="heroKicker"><span className="kickerDot"/>Estudio creativo digital para GTA V y GTA VI</p>
      <h1 className="heroTitle">Tu mundo.<br/>Tu manera.</h1>
      <p className="heroLead">Mapeados, scripts, sistemas y ropa para servidores de GTA V, entregados como tarjetas de acceso. Compras la tarjeta, la activas y descargas los archivos.</p>
      <div className="heroActions"><StudioLink className="button lightButton" href="/gta-v#catalogo">Ver la colección <Icon name="arrow"/></StudioLink><a className="button ghostButton" href="#como-funciona">Cómo funciona <Icon name="down"/></a></div>
    </div>
    <div className="heroStage">
      <div className="heroCard"><AccessCard product={product} idle eager sizes="(max-width: 900px) 92vw, 44vw"/></div>
      <Figures className="heroFigures" height={200}/>
    </div>
    <div className="heroMeta"><span>07 tarjetas · GTA V</span><span>Soporte por email</span><span>GTA VI en preparación</span></div>
  </section>;
}
