"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "./motion/gsap";
import StudioLink from "./StudioLink";
import AccessCard from "./AccessCard";
import Icon from "./Icon";

/*
 * Horizontal showcase of access cards. On desktop the section pins and
 * vertical scroll drives the track sideways (ease "none" keeps scroll and
 * position 1:1). On touch and small screens it is a native snap scroller.
 */
export default function FeaturedRail({ products }) {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const section = root.current;
      const track = section.querySelector(".railTrack");
      const bar = section.querySelector(".railProgress i");
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth + 2 * parseFloat(getComputedStyle(section).paddingLeft));
      gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: section, pin: true, scrub: 0.6, start: "top top", end: () => `+=${distance()}`, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: self => gsap.set(bar, { scaleX: self.progress }) },
      });
    });
  }, { scope: root });

  return <section className="featuredRail" ref={root} aria-labelledby="featured-title">
    <div className="railHead">
      <div><p className="kicker" data-reveal="fade">Selección del estudio</p><h2 id="featured-title" data-split>Tarjetas destacadas.</h2></div>
      <div className="railMeta"><p>Cuatro piezas con las que empezar. Todas con soporte y actualizaciones.</p><div className="railProgress" aria-hidden="true"><i/></div></div>
    </div>
    <div className="railViewport">
      <div className="railTrack" data-batch>
        {products.map(product => <article className="railItem" key={product.id}>
          <StudioLink className="railCardLink" href={`/gta-v?p=${product.id}#catalogo`} aria-label={`Ver ${product.name}`}><AccessCard product={product} sizes="(max-width: 900px) 80vw, 38vw"/></StudioLink>
          <p>{product.description}</p>
        </article>)}
        <StudioLink className="railMore" href="/gta-v#catalogo"><span className="kicker">Catálogo completo</span><h3>Ver las siete tarjetas.</h3><span className="circleArrow"><Icon name="diagonal"/></span></StudioLink>
      </div>
    </div>
  </section>;
}
