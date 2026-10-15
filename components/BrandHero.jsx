"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "./motion/gsap";
import Media from "./Media";
import Icon from "./Icon";

/*
 * Opening scene. An intro timeline builds the wordmark letter by letter, then
 * a scrubbed timeline parallaxes and fades the content as the hero leaves.
 */
export default function BrandHero() {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const wordmark = el.querySelector(".heroWordmark");
      const split = SplitText.create(wordmark, { type: "chars", charsClass: "heroChar" });
      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
      intro
        .from(".heroBackdrop", { scale: 1.12, autoAlpha: 0, duration: 2.2, ease: "power2.out" }, 0)
        .from(split.chars, { yPercent: 105, rotate: 4, duration: 1.3, stagger: 0.045 }, 0.1)
        .from(".heroFigures", { y: 60, autoAlpha: 0, duration: 1.4 }, 0.45)
        .from(".heroMeta > *", { y: -14, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.7)
        .from(".heroFoot > *", { y: 26, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.85)
        .from(".heroRule", { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, 0.9);

      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroStage", { yPercent: 28, ease: "none" }, 0)
        .to(".heroFoot, .heroMeta", { autoAlpha: 0, y: -30, ease: "none" }, 0)
        .to(".heroBackdrop", { yPercent: 18, ease: "none" }, 0);
      return () => split.revert();
    });
  }, { scope: root });

  return <section className="brandHero" id="inicio" ref={root}>
    <div className="heroBackdrop" aria-hidden="true"><Media src="/assets/los-santos-night.jpg" alt="" eager sizes="100vw" position="50% 40%"/></div>
    <div className="heroMeta"><span><i className="statusDot"/> ESTUDIO CREATIVO DIGITAL</span><span>VOL. 01 — GTA V / GTA VI</span><span>IDENTIDAD EN CADA PÍXEL</span></div>
    <div className="heroStage">
      <img className="heroFigures" src="/brand/figures.png" alt="" width="295" height="405" fetchPriority="high" aria-hidden="true"/>
      <h1 className="heroWordmark" aria-label="GENTE.ARTS"><span className="heroGente">GENTE.</span><span className="heroArts">ARTS</span></h1>
    </div>
    <div className="heroRule" aria-hidden="true"/>
    <div className="heroFoot">
      <p className="heroClaim"><span className="eyebrow">PARA QUIENES CREAN</span>Tu mundo.<br/><em>Tu manera.</em></p>
      <p className="heroLead">Mapeados, scripts, sistemas y ropa para servidores de GTA V con identidad propia. El siguiente capítulo, GTA VI, ya está en marcha.</p>
      <a className="heroExplore" href="#universos"><span>Encuentra tu universo</span><span className="circleArrow"><Icon name="down"/></span></a>
    </div>
  </section>;
}
