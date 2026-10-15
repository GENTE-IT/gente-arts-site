"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import DitherVeil from "./reactbits/DitherVeil";
import Icon from "./Icon";
import StudioLink from "./StudioLink";

/*
 * Opening scene: black stage, the brand composition veiled in a dither and
 * revealed in full colour where the pointer passes (React Bits' DitherVeil).
 * Only the two calls to action sit under the mark.
 */
export default function BrandHero() {
  const root = useRef(null);
  // Portrait composition and a finer dither on phones, where the wide mark would shrink.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const update = () => setNarrow(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.6 })
        .from(".heroMeta > *", { y: -12, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0)
        .from(".heroActions > *", { y: 26, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.2);
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(".heroVeil", { yPercent: 18, autoAlpha: 0.25, ease: "none" }, 0)
        .to(".heroActions, .heroMeta", { autoAlpha: 0, y: -30, ease: "none" }, 0);
    });
  }, { scope: root });

  return <section className="brandHero" id="inicio" ref={root}>
    <div className="heroVeil"><DitherVeil src={narrow ? "/brand/hero-logo-portrait.png" : "/brand/hero-logo.png"} fit="contain" pattern="floyd" pixelSize={narrow ? 2 : 3} inkColor="#000000" paperColor="#ffffff" contrast={1.1} revealRadius={narrow ? 140 : 230} softness={0.7} linger={1.4} wander clickBurst/></div>
    <h1 className="srOnly">GENTE.ARTS — Tu mundo. Tu manera.</h1>
    <div className="heroMeta"><span><i className="kickerDot"/>Estudio creativo digital</span><span>Vol. 01 · GTA V / GTA VI</span><span>Tarjetas de acceso a recursos</span></div>
    <div className="heroActions"><StudioLink className="button lightButton" href="/gta-v#catalogo">Ver la colección <Icon name="arrow"/></StudioLink><a className="button ghostButton" href="#como-funciona">Cómo funciona <Icon name="down"/></a></div>
  </section>;
}
