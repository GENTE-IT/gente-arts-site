"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "./motion/gsap";
import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";
import { money } from "./ShopProvider";

/*
 * Horizontal showcase. On desktop the section pins and vertical scroll drives
 * the track sideways (ease: "none" keeps scroll and position 1:1). On touch and
 * small screens it falls back to a native, snap-aligned horizontal scroller.
 */
export default function FeaturedRail({ products }) {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const section = root.current;
      const track = section.querySelector(".railTrack");
      const bar = section.querySelector(".railProgress i");
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: section, pin: true, scrub: 0.6, start: "top top", end: () => `+=${distance()}`, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => gsap.set(bar, { scaleX: self.progress }),
        },
      });
      gsap.utils.toArray(".railCard .media img").forEach(img => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img.closest(".railCard"), containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    });
  }, { scope: root });

  return <section className="featuredRail" ref={root} aria-labelledby="featured-title">
    <div className="railHead">
      <div><p className="eyebrow"><span className="colorDash"/> SELECCIÓN DEL ESTUDIO</p><h2 id="featured-title">Piezas destacadas.</h2></div>
      <div className="railMeta"><p>Una muestra de lo que puedes llevarte a tu servidor.</p><div className="railProgress" aria-hidden="true"><i/></div></div>
    </div>
    <div className="railViewport">
      <div className="railTrack">
        {products.map((product, index) => <StudioLink className="railCard" href={`/gta-v?p=${product.id}#catalogo`} key={product.id}>
          <div className="railVisual"><Media src={product.image} alt={product.name} sizes="(max-width: 900px) 80vw, 46vw"/><span className="railIndex">0{index + 1}</span><span className="productTag">{product.label}</span></div>
          <div className="railInfo"><div><small>GTA V / {product.number}</small><h3>{product.name}</h3></div><strong>{money(product.price)}</strong></div>
          <p>{product.description}</p>
        </StudioLink>)}
        <StudioLink className="railCard railMore" href="/gta-v#catalogo"><span className="eyebrow">CATÁLOGO COMPLETO</span><h3>Ver toda<br/>la colección.</h3><span className="circleArrow"><Icon name="diagonal"/></span></StudioLink>
      </div>
    </div>
  </section>;
}
