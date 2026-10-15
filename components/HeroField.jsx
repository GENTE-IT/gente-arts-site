"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./motion/gsap";

/*
 * Interactive dot field. A grid of dots lights up and swells near the pointer;
 * a click or tap drops a ripple that travels outward and displaces the dots
 * like water. Plain 2D canvas driven by the GSAP ticker (so it pauses with
 * the page and shares one frame loop). Under prefers-reduced-motion the grid
 * is drawn once and left still.
 */
const SPACING = 14, SIGMA = 170, RIPPLE_SPEED = 0.46, RIPPLE_WIDTH = 46, RIPPLE_LIFE = 3000;

export default function HeroField({ className = "" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = { w: 0, h: 0, dpr: 1, dots: [], pointer: { x: -9999, y: -9999, active: false }, ripples: [], lastAmbient: 0 };

    const build = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      state.w = rect.width; state.h = rect.height;
      canvas.width = Math.round(rect.width * state.dpr); canvas.height = Math.round(rect.height * state.dpr);
      canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`;
      const cols = Math.ceil(rect.width / SPACING) + 1, rows = Math.ceil(rect.height / SPACING) + 1;
      const offsetX = (rect.width - (cols - 1) * SPACING) / 2, offsetY = (rect.height - (rows - 1) * SPACING) / 2;
      state.dots = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) state.dots.push({ x: offsetX + c * SPACING, y: offsetY + r * SPACING });
    };

    const draw = () => {
      const { w, h, dpr, dots, pointer, ripples } = state;
      const now = performance.now();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t0 > RIPPLE_LIFE) ripples.splice(i, 1);
      const twoSigma = 2 * SIGMA * SIGMA, twoWidth = 2 * RIPPLE_WIDTH * RIPPLE_WIDTH;
      for (const dot of dots) {
        let x = dot.x, y = dot.y, glow = 0, scale = 1;
        if (pointer.active) {
          const dx = dot.x - pointer.x, dy = dot.y - pointer.y, d2 = dx * dx + dy * dy;
          const influence = Math.exp(-d2 / twoSigma);
          glow += influence; scale += influence * 1.9;
          const push = influence * 14, d = Math.sqrt(d2) || 1;
          x += (dx / d) * push; y += (dy / d) * push;
        }
        for (const ripple of ripples) {
          const age = now - ripple.t0, radius = age * RIPPLE_SPEED;
          const dx = dot.x - ripple.x, dy = dot.y - ripple.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          const band = Math.exp(-((d - radius) * (d - radius)) / twoWidth) * Math.exp(-age / 900);
          if (band < 0.003) continue;
          const amp = band * 26;
          x += (dx / d) * amp; y += (dy / d) * amp;
          glow += band * 1.2; scale += band * 1.4;
        }
        const alpha = Math.min(0.98, 0.22 + glow * 0.85);
        const radius = 1.05 * Math.min(scale, 3.4);
        // deep brand blue at rest, electric cyan where the pointer or a ripple passes
        const mix = Math.min(1, glow);
        ctx.fillStyle = `rgba(${Math.round(52 + 110 * mix)}, ${Math.round(126 + 90 * mix)}, ${Math.round(168 + 87 * mix)}, ${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      }
    };

    const tick = () => {
      const now = performance.now();
      // an ambient ripple now and then so the field feels alive before any interaction
      if (now - state.lastAmbient > 3600) { state.lastAmbient = now; state.ripples.push({ x: state.w * (0.25 + Math.random() * 0.5), y: state.h * (0.25 + Math.random() * 0.5), t0: now }); }
      draw();
    };

    const toLocal = event => { const rect = canvas.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    const onMove = event => { const p = toLocal(event); state.pointer.x = p.x; state.pointer.y = p.y; state.pointer.active = true; };
    const onLeave = () => { state.pointer.active = false; };
    const onDown = event => { const p = toLocal(event); state.ripples.push({ x: p.x, y: p.y, t0: performance.now() }); };

    build();
    const host = canvas.parentElement;
    const observer = new ResizeObserver(() => { build(); if (reduced.matches) draw(); });
    observer.observe(host);
    if (reduced.matches) { draw(); }
    else {
      gsap.ticker.add(tick);
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown, { passive: true });
    }
    return () => {
      gsap.ticker.remove(tick); observer.disconnect();
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); host.removeEventListener("pointerdown", onDown);
    };
  }, []);
  return <canvas className={`heroField ${className}`} ref={canvasRef} aria-hidden="true"/>;
}
