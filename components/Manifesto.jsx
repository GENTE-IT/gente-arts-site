"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "./motion/gsap";

const text = "No vendemos ruido. Creamos piezas digitales para mundos abiertos con identidad, detalle y algo que decir.";

/*
 * Pinned statement. The section stays fixed while the user scrolls ~1.6
 * screens; each word lights up in turn, and the side rails report progress.
 */
export default function Manifesto() {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = root.current;
      const passage = el.querySelector(".manifestoText");
      const percent = el.querySelector(".manifestoPercent");
      const rail = el.querySelector(".manifestoRail i");
      const split = SplitText.create(passage, { type: "words", wordsClass: "manifestoWord" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, start: "top top", end: "+=170%", pin: true, scrub: 0.5, anticipatePin: 1,
          onUpdate: self => { percent.textContent = String(Math.round(self.progress * 100)).padStart(2, "0"); gsap.set(rail, { scaleY: self.progress }); },
        },
      });
      tl.fromTo(split.words, { opacity: 0.12, filter: "blur(3px)", y: 10 }, { opacity: 1, filter: "blur(0px)", y: 0, ease: "none", stagger: { each: 1, ease: "none" }, duration: 3 })
        .to(".manifestoAccent", { "--accent-reveal": 1, ease: "none", duration: 2 }, "<60%")
        .to(".manifestoReader", { yPercent: -6, autoAlpha: 0.45, ease: "power1.in", duration: 2 }, ">1");
      return () => split.revert();
    });
  }, { scope: root });

  return <section className="manifesto" ref={root} aria-labelledby="store-manifesto">
    <div className="manifestoReader">
      <aside className="manifestoSide" aria-hidden="true"><span>GENTE.ARTS<br/>MANIFIESTO 01</span><div className="manifestoRail"><i/></div><span>EL DETALLE<br/>IMPORTA</span></aside>
      <h2 className="manifestoText" id="store-manifesto">{text}</h2>
      <aside className="manifestoSide manifestoMeasure" aria-hidden="true"><span>SIGUE<br/>EXPLORANDO</span><div className="manifestoCount"><span className="manifestoPercent">00</span><small>% LEÍDO</small></div><span className="manifestoAccent">DISEÑO DIGITAL<br/>SIN RUIDO</span></aside>
    </div>
  </section>;
}
