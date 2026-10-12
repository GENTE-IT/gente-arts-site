"use client";

import { useEffect, useRef } from "react";

export default function ScrollWordReveal() {
  const sectionRef = useRef(null);
  const passageRef = useRef(null);
  const percentRef = useRef(null);
  const fractionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const passage = passageRef.current;
    if (!section || !passage) return;

    const original = passage.cloneNode(true);
    const walker = document.createTreeWalker(passage, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!node.nodeValue.trim() || parent?.closest("script,style,input,textarea,select,button,[data-no-split]")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const token of node.nodeValue.split(/(\s+)/)) {
        if (/^\s+$/.test(token)) fragment.append(token);
        else if (token) {
          const span = document.createElement("span");
          span.dataset.word = "";
          span.textContent = token;
          fragment.append(span);
        }
      }
      node.replaceWith(fragment);
    }

    const words = [...passage.querySelectorAll("[data-word]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, -rect.top / distance));
      const head = 2.4 + progress * (words.length - 0.4);
      let revealed = 0;

      section.style.setProperty("--story-progress", progress.toFixed(4));
      words.forEach((word, index) => {
        const local = Math.min(1, Math.max(0, (head - index) / 2.2));
        word.style.setProperty("--word-progress", local.toFixed(3));
        if (local > 0.62) revealed += 1;
      });
      if (percentRef.current) percentRef.current.textContent = String(Math.round(progress * 100)).padStart(2, "0");
      if (fractionRef.current) fractionRef.current.textContent = `${String(revealed).padStart(2, "0")} / ${String(words.length).padStart(2, "0")}`;
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reduced.addEventListener("change", requestRender);
    render();

    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      reduced.removeEventListener("change", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
      passage.replaceChildren(...[...original.childNodes].map(node => node.cloneNode(true)));
    };
  }, []);

  return (
    <section className="wordStory" ref={sectionRef} aria-labelledby="store-manifesto">
      <div className="wordReader">
        <aside className="wordSide" aria-hidden="true">
          <span>GENTE.ARTS<br/>MANIFIESTO 01</span>
          <div className="wordRail"><i /></div>
          <strong ref={fractionRef}>00 / 16</strong>
        </aside>
        <h2 className="wordPassage" id="store-manifesto">
          <span className="srOnly">No vendemos ruido. Creamos piezas digitales para mundos abiertos con identidad, detalle y algo que decir.</span>
          <span className="wordVisual" aria-hidden="true" ref={passageRef}>No vendemos ruido. Creamos <em>piezas digitales</em> para mundos abiertos con identidad, detalle y <strong>algo que decir.</strong></span>
        </h2>
        <aside className="wordSide wordMeasure" aria-hidden="true">
          <span>SCROLL TO READ<br/>REVERSIBLE MOTION</span>
          <div className="wordPercent"><span ref={percentRef}>00</span><small>% LEÍDO</small></div>
          <span>DISEÑO DIGITAL<br/>SIN RUIDO</span>
        </aside>
      </div>
    </section>
  );
}
