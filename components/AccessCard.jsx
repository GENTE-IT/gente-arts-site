"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./motion/gsap";
import Media from "./Media";
import { Wordmark } from "./brand/Logo";
import Raya from "./brand/Raya";
import Icon from "./Icon";
import { categoryOf, formatDate } from "../data/products";
import { money } from "./ShopProvider";

/*
 * The access card: every product is sold as a card you buy, activate and use
 * to download the resource. It follows the product thumbnail of the manual
 * (ch. 15): darkened capture, category band, name, version and the raya as
 * the floor. Front = capture + identity, back = what you get. `tilt` follows
 * the pointer in 3D, `flipped` shows the back, `idle` adds a slow float.
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
      const move = contextSafe(event => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rx(-py * 14); ry(px * 18 + (el.classList.contains("isFlipped") ? 180 : 0));
      });
      const leave = contextSafe(() => { rx(0); ry(el.classList.contains("isFlipped") ? 180 : 0); });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    mm.add(MOTION_OK, () => {
      if (!idle) return;
      gsap.to(el.querySelector(".cardFloat"), { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
  }, { scope: root, dependencies: [tilt, idle] });

  useGSAP(() => {
    gsap.to(root.current.querySelector(".cardBody"), { rotationY: flipped ? 180 : 0, duration: 0.9, ease: "power3.inOut", overwrite: "auto" });
  }, { dependencies: [flipped] });

  return <div className={`accessCard ${flipped ? "isFlipped" : ""} ${className}`} ref={root} style={{ "--band": category.band }}>
    <div className="cardFloat">
      <div className="cardBody">
        <div className="cardFace cardFront">
          <Media src={product.image} alt="" sizes={sizes} eager={eager} position="50% 40%"/>
          <span className="cardShade" aria-hidden="true"/>
          <header className="cardHead"><span className="cardLabel"><Raya band={category.band}/>{category.label}</span><span className="cardMono">v{product.version}</span></header>
          <div className="cardTitle"><h3>{product.name}</h3></div>
          <footer className="cardFoot"><Wordmark mono className="cardWordmark"/><span className="cardMono">{product.resource}</span><strong className="cardPrice">{money(product.price)}</strong></footer>
          <Raya className="cardRaya"/>
        </div>
        <div className="cardFace cardBack">
          <header className="cardHead"><Wordmark className="cardWordmark"/><span className="cardMono">{product.resource} · v{product.version}</span></header>
          <div className="cardBackBody">
            <p className="cardBackLabel">Esta tarjeta incluye</p>
            <ul>{product.features.map(item => <li key={item}><Icon name="check" size={13}/>{item}</li>)}</ul>
            <p className="cardCompat">{product.compat.map(tag => <span key={tag}>{tag}</span>)}</p>
          </div>
          <footer className="cardFoot cardFootBack"><span className="cardMono">Actualizado {formatDate(product.updated)}</span><span>{product.delivery}</span></footer>
          <Raya className="cardRaya"/>
        </div>
      </div>
      <span className="cardShadow" aria-hidden="true"/>
    </div>
  </div>;
}
