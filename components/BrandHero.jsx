"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function BrandHero() {
  const [posterFailed, setPosterFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slow, setSlow] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (reduced || paused || loaded || failed) return;
    const timer = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(timer);
  }, [reduced, paused, loaded, failed]);
  const animated = !reduced && !paused && !failed;
  return <section className="brandHero" id="inicio">
    <h1 className="srOnly">GENTE.ARTS — Recursos digitales para mundos abiertos</h1>
    <div className="brandHeroMeta"><span><i className="statusDot"/> ESTUDIO CREATIVO DIGITAL</span><span>IDENTIDAD EN CADA PÍXEL</span></div>
    <div className="heroStage">
      {posterFailed ? <div className="heroWordmark" aria-label="GENTE.ARTS">GENTE.<span className="brandArts">ARTS</span></div> : <img className={`heroPoster ${animated && loaded ? "posterHidden" : ""}`} src="/brand/gente-arts-final.png" alt={animated && loaded ? "" : "GENTE.ARTS"} width="900" height="900" fetchPriority="high" onError={() => setPosterFailed(true)}/>}
      {animated && <img className={`heroAnimation ${loaded ? "isReady" : ""}`} src="/brand/gente-arts-estela.webp" alt="Animación del logotipo GENTE.ARTS" width="900" height="900" onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
    </div>
    <div className="heroPlayback">{animated && !loaded ? <span className="heroLoading" role="status"><span className="tinySpinner"/>{slow ? "La animación tarda un poco. Puedes seguir explorando." : "Preparando la animación"}</span> : <span className="heroEdition">GENTE.ARTS — VOL. 01</span>}{!reduced && !failed && <button onClick={() => setPaused(value => !value)} aria-label={paused ? "Reproducir animación" : "Pausar animación"}><Icon name={paused ? "play" : "pause"} size={14}/></button>}</div>
    <div className="brandHeroFoot"><div><span className="eyebrow">PARA QUIENES CREAN</span><p>Tu mundo.<br/><em>Tu manera.</em></p></div><a className="heroExplore" href="#universos"><span>Encuentra tu universo</span><span className="circleArrow"><Icon name="down"/></span></a></div>
  </section>;
}
