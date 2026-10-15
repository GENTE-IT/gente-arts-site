"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import Media from "./Media";
import Logo from "./brand/Logo";
import Stripes from "./brand/Stripes";
import Icon from "./Icon";
import { categoryOf } from "../data/products";
import { money } from "./ShopProvider";

/*
 * The access card: every product is sold as a physical-feeling card you buy,
 * activate and use to download the files. Front = artwork + identity,
 * back = what you get. `tilt` follows the pointer in 3D, `flipped` shows the
 * back, `idle` adds a slow floating motion (hero). Pure CSS 3D + GSAP, no WebGL.
 */
export default function AccessCard({ product, tilt = true, flipped = false, idle = false, className = "", sizes = "(max-width: 600px) 90vw, 520px", eager = false }) {
  const root = useRef(null);
  const category = categoryOf(product);

  useGSAP((context, contextSafe) => {
    const el = root.current;
    const body = el.querySelector(".cardBody");
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover)`, () => {
      if (!tilt) return;
      const rx = gsap.quickTo(body, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(body, "rotationY", { duration: 0.6, ease: "power3.out" });
      const mx = gsap.quickTo(el, "--mx", { duration: 0.5, ease: "power2.out" });
      const my = gsap.quickTo(el, "--my", { duration: 0.5, ease: "power2.out" });
      const move = contextSafe(event => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rx(-py * 18); ry(px * 22 + (el.classList.contains("isFlipped") ? 180 : 0));
        mx((px + 0.5) * 100); my((py + 0.5) * 100);
      });
      const leave = contextSafe(() => { rx(0); ry(el.classList.contains("isFlipped") ? 180 : 0); mx(50); my(35); });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    mm.add(MOTION_OK, () => {
      if (!idle) return;
      gsap.to(el.querySelector(".cardFloat"), { y: -14, rotation: -1.5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
  }, { scope: root, dependencies: [tilt, idle] });

  useGSAP(() => {
    gsap.to(root.current.querySelector(".cardBody"), { rotationY: flipped ? 180 : 0, duration: 0.9, ease: "power3.inOut", overwrite: "auto" });
  }, { dependencies: [flipped] });

  return <div className={`accessCard ${flipped ? "isFlipped" : ""} ${className}`} ref={root} style={{ "--accent": category.accent, "--accent-ink": category.ink }}>
    <div className="cardFloat">
      <div className="cardBody">
        <div className="cardFace cardFront">
          <Media src={product.image} alt="" sizes={sizes} eager={eager} position="50% 40%"/>
          <span className="cardTint" aria-hidden="true"/>
          <span className="cardGrain" aria-hidden="true"/>
          <header className="cardHead"><Stripes width={34}/><span className="cardSerial">{product.serial}</span></header>
          <div className="cardTitle"><small>{category.label} · {product.gameLabel}</small><h3>{product.name}</h3></div>
          <footer className="cardFoot"><Logo height={12}/><span>{product.volume} · {product.edition}</span><strong>{money(product.price)}</strong></footer>
          <span className="cardSheen" aria-hidden="true"/>
        </div>
        <div className="cardFace cardBack">
          <span className="cardGrain" aria-hidden="true"/>
          <header className="cardHead"><Logo height={13} mono/><span className="cardSerial">{product.serial} · v{product.version}</span></header>
          <div className="cardBackBody">
            <p className="cardBackLabel">Esta tarjeta incluye</p>
            <ul>{product.features.map(item => <li key={item}><Icon name="check" size={13}/>{item}</li>)}</ul>
            <p className="cardCompat">{product.compat.map(tag => <span key={tag}>{tag}</span>)}</p>
          </div>
          <footer className="cardFoot cardFootBack"><span className="cardBarcode" aria-hidden="true"/><span>{product.delivery}</span></footer>
          <span className="cardSheen" aria-hidden="true"/>
        </div>
      </div>
      <span className="cardShadow" aria-hidden="true"/>
    </div>
  </div>;
}
