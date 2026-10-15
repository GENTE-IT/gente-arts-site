"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "./gsap";

/*
 * Declarative scroll motion for a whole region of the page.
 * Mount <ScrollMotion/> anywhere inside the region (it scopes itself to the
 * closest `scope` ancestor) and annotate elements:
 *
 *   data-reveal            fade + rise when the element enters the viewport
 *   data-reveal="fade"     fade only
 *   data-reveal="clip"     wipe from the bottom
 *   data-reveal-group      stagger the direct children instead of the element
 *   data-split             split the heading into lines/words and animate them in
 *   data-parallax="0.12"   scrub the element vertically while its parent scrolls
 *   data-scale             subtle zoom-out of an image while entering
 *
 * Everything is wrapped in gsap.matchMedia so reduced-motion users get the
 * final state immediately, and useGSAP reverts it all when the page unmounts.
 */
export default function ScrollMotion({ scope = "main" }) {
  const anchor = useRef(null);
  useGSAP(() => {
    const root = anchor.current?.closest(scope) || anchor.current?.parentElement;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = selector => Array.from(root.querySelectorAll(selector));

      // Headings: lines + words, masked lines so words rise out of nothing.
      q("[data-split]").forEach(el => {
        SplitText.create(el, {
          type: "lines,words", mask: "lines", autoSplit: true, linesClass: "splitLine", wordsClass: "splitWord",
          onSplit: self => gsap.from(self.words, {
            yPercent: 110, rotate: 2, duration: 1.1, ease: "power4.out", stagger: { each: 0.035, from: "start" },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        });
      });

      // Single elements.
      const singles = q("[data-reveal]").filter(el => !el.closest("[data-reveal-group]") || el.hasAttribute("data-reveal-group"));
      singles.forEach(el => {
        const kind = el.getAttribute("data-reveal") || "up";
        const delay = Number(el.getAttribute("data-reveal-delay") || 0);
        const from = kind === "fade" ? { autoAlpha: 0 } : kind === "clip" ? { clipPath: "inset(100% 0 0 0)", y: 24 } : { autoAlpha: 0, y: 36 };
        gsap.from(el, { ...from, duration: 1.05, delay, ease: "power3.out", clearProps: kind === "clip" ? "clipPath" : "", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      // Groups: stagger the children.
      q("[data-reveal-group]").forEach(group => {
        const items = Array.from(group.children);
        if (!items.length) return;
        gsap.from(items, { autoAlpha: 0, y: 30, duration: 0.95, ease: "power3.out", stagger: 0.09, scrollTrigger: { trigger: group, start: "top 88%", once: true } });
      });

      // Parallax: element moves slower/faster than its container.
      q("[data-parallax]").forEach(el => {
        const amount = Number(el.getAttribute("data-parallax") || 0.12) * 100;
        const trigger = el.closest("[data-parallax-box]") || el.parentElement;
        gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // Images that settle from a slight zoom.
      q("[data-scale]").forEach(el => {
        gsap.from(el, { scale: 1.12, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
    });
    // Images and fonts load after mount; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    return () => { clearTimeout(timer); window.removeEventListener("load", refresh); };
  }, { scope: anchor });
  return <span ref={anchor} hidden aria-hidden="true" data-scroll-motion=""/>;
}
