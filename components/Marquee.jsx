"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "./motion/gsap";
import Stripes from "./brand/Stripes";

const items = ["Mapeados", "Scripts", "Ropa", "Sistemas", "FiveM", "GTA V", "GTA VI próximamente"];

/*
 * Infinite ticker. The track is duplicated and translated -50% on loop; scroll
 * velocity nudges the playback speed and direction so it feels connected to
 * the page instead of running on its own.
 */
export default function Marquee({ dark = false }) {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const track = root.current.querySelector(".marqueeTrack");
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
      const speed = gsap.quickTo(loop, "timeScale", { duration: 0.6, ease: "power2.out" });
      ScrollTrigger.create({
        onUpdate: self => {
          const velocity = gsap.utils.clamp(-3000, 3000, self.getVelocity());
          speed(1 + velocity / 900);
        },
      });
      return () => loop.kill();
    });
  }, { scope: root });
  const group = <>{items.map(item => <span key={item}>{item}<Stripes width={14}/></span>)}</>;
  return <div className={`marquee ${dark ? "marqueeDark" : ""}`} ref={root} aria-label="Especialidades del estudio">
    <div className="marqueeTrack" aria-hidden="true">{group}{group}</div>
    <span className="srOnly">{items.join(", ")}</span>
  </div>;
}
