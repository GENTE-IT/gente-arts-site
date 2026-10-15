"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./motion/gsap";

/*
 * Interactive dot field. The grid breathes like a water surface: three slow
 * travelling waves modulate each dot's size, brightness and position. Dots
 * light up and swell near the pointer, and a click or tap drops a ripple that
 * travels outward. Plain 2D canvas on the GSAP ticker (pauses with the page,
 * one shared frame loop). Under prefers-reduced-motion the grid is drawn
 * once and left still.
 */
const SPACING = 14, SIGMA = 170, RIPPLE_SPEED = 0.46, RIPPLE_WIDTH = 46, RIPPLE_LIFE = 3000;

export default function HeroField({ className = "" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = { w: 0, h: 0, dpr: 1, dots: [], pointer: { x: -9999, y: -9999, active: false }, ripples: [] };

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
      const t = now;
      for (const dot of dots) {
        // slow travelling waves: the resting surface of the field
        const swell = Math.sin(dot.x * 0.011 + t * 0.00085) * Math.cos(dot.y * 0.009 - t * 0.0007) + 0.55 * Math.sin((dot.x - dot.y) * 0.006 + t * 0.00055);
        const level = (swell / 1.55 + 1) / 2; // 0..1
        let x = dot.x, y = dot.y + swell * 2.4, glow = level * 0.42, scale = 0.85 + level * 0.9;
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
        const alpha = Math.min(0.98, 0.1 + glow * 0.9);
        const radius = 1.05 * Math.min(scale, 3.6);
        // deep brand blue at rest, electric cyan where the pointer or a ripple passes
        const mix = Math.min(1, glow);
        ctx.fillStyle = `rgba(${Math.round(52 + 110 * mix)}, ${Math.round(126 + 90 * mix)}, ${Math.round(168 + 87 * mix)}, ${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      }
    };

    const tick = () => draw();

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
