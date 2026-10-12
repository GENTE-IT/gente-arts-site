"use client";

import { useEffect, useState } from "react";

const ANIMATION_DURATION = 8350;
const EXIT_DURATION = 850;

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = preference.matches ? 1250 : ANIMATION_DURATION;
    setReducedMotion(preference.matches);
    document.body.classList.add("introLocked");

    const leaveTimer = window.setTimeout(() => setLeaving(true), duration);
    const removeTimer = window.setTimeout(() => setVisible(false), duration + EXIT_DURATION);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("introLocked");
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.classList.remove("introLocked");
  }, [visible]);

  const skip = () => {
    setLeaving(true);
    window.setTimeout(() => setVisible(false), EXIT_DURATION);
  };

  if (!visible) return null;

  return (
    <div className={`logoIntro ${leaving ? "isLeaving" : ""}`} aria-label="Presentación de GENTE.ARTS">
      <div className="introChrome">
        <span>GENTE.ARTS®</span>
        <span>CREATIVE STORE / 2026</span>
      </div>
      <div className="introAnimation">
        <img
          src={reducedMotion ? "/brand/gente-arts-final.png" : "/brand/gente-arts-estela.webp"}
          alt="La estela de color se transforma en el logotipo de GENTE.ARTS"
        />
      </div>
      <button className="skipIntro" type="button" onClick={skip}>SALTAR INTRO <span>↘</span></button>
      <div className="introProgress" aria-hidden="true"><i /></div>
    </div>
  );
}
