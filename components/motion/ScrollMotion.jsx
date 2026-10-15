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
 *   data-img-reveal        wipe the image in (clip + settle from a zoom) when it enters
 *   data-batch             stagger the children in viewport batches (grids)
 *   data-magnetic          buttons and round links follow the pointer slightly
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

      // Image reveals: the frame wipes open while the picture settles from a zoom.
      q("[data-img-reveal]").forEach(el => {
        const img = el.querySelector("img");
        const dir = el.getAttribute("data-img-reveal") || "up";
        const clip = dir === "left" ? "inset(0 100% 0 0)" : dir === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(el, { clipPath: clip }, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "power4.inOut", clearProps: "clipPath" }, 0);
        if (img) tl.from(img, { scale: 1.22, duration: 1.8, ease: "power3.out" }, 0);
      });

      // Grids: stagger items as they arrive, in batches.
      q("[data-batch]").forEach(grid => {
        const items = Array.from(grid.children);
        gsap.set(items, { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(items, { start: "top 90%", once: true, interval: 0.12, batchMax: 4, onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true }) });
      });
    });

    // Magnetic buttons: follow the pointer a few pixels and spring back (pointer devices only).
    mm.add(`${MOTION_OK} and (hover: hover)`, () => {
      const cleanups = root.querySelectorAll("[data-magnetic], .button, .circleArrow");
      cleanups.forEach(el => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = event => { const r = el.getBoundingClientRect(); x((event.clientX - r.left - r.width / 2) * 0.28); y((event.clientY - r.top - r.height / 2) * 0.28); };
        const leave = () => { x(0); y(0); };
        el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
        el.__magnetic = () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
      });
      return () => cleanups.forEach(el => { el.__magnetic?.(); delete el.__magnetic; });
    });
    // Images and fonts load after mount; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    return () => { clearTimeout(timer); window.removeEventListener("load", refresh); };
  }, { scope: anchor });
  return <span ref={anchor} hidden aria-hidden="true" data-scroll-motion=""/>;
}
