"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK, DESKTOP } from "./motion/gsap";
import AccessCard from "./AccessCard";

const steps = [
  ["01", "Eliges tu tarjeta", "Cada recurso es una tarjeta de acceso con su número de serie, su versión y lo que incluye."],
  ["02", "La activas", "Al comprarla recibes una clave. La activas en tu cuenta y la tarjeta queda ligada a tu servidor."],
  ["03", "Descargas y actualizas", "Acceso inmediato a los archivos, la documentación y todas las actualizaciones de esa versión."],
];

/*
 * Pinned explainer. While the user scrolls, the card turns from front to back
 * and the three steps light up in sequence. Falls back to a static stack on
 * small screens and under prefers-reduced-motion.
 */
export default function HowItWorks({ product }) {
  const root = useRef(null);
  const [flipped, setFlipped] = useState(false);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
      const el = root.current;
      const items = gsap.utils.toArray(".howStep", el);
      gsap.set(items, { autoAlpha: 0.25 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=220%", pin: true, scrub: 0.6, anticipatePin: 1, onUpdate: self => setFlipped(self.progress > 0.42) } });
      tl.to(".howStage", { rotation: -4, y: -20, ease: "none", duration: 3 }, 0);
      items.forEach((item, index) => {
        tl.to(item, { autoAlpha: 1, x: 0, duration: 0.6 }, index * 0.9 + 0.2)
          .to(item, { autoAlpha: 0.25, duration: 0.6 }, index * 0.9 + 1.2);
      });
      tl.to(items[items.length - 1], { autoAlpha: 1, duration: 0.4 }, ">-0.2");
    });
  }, { scope: root });

  return <section className="howItWorks" ref={root} id="como-funciona" aria-labelledby="how-title">
    <div className="howInner">
      <div className="howCopy">
        <p className="kicker" data-reveal="fade">Cómo funciona</p>
        <h2 id="how-title" data-split>Compras la tarjeta. El recurso es tuyo.</h2>
        <ol className="howSteps">{steps.map(([number, title, copy]) => <li className="howStep" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </div>
      <div className="howStage"><AccessCard product={product} flippable flipped={flipped} onFlip={setFlipped}/></div>
    </div>
  </section>;
}
