"use client";

import Image from "next/image";
import { useState } from "react";
import { blur } from "../data/blur";

/*
 * Image wrapper used across the store. `fill` images need a positioned parent,
 * which `.media` provides. `parallax` marks the layer for ScrollMotion, which
 * scrubs it vertically while the parent scrolls through the viewport.
 */
export default function Media({ src, alt, className = "", eager = false, sizes = "100vw", fit = "cover", parallax = 0, scale = false, position }) {
  return <MediaAsset key={src} {...{ src, alt, className, eager, sizes, fit, parallax, scale, position }}/>;
}

function MediaAsset({ src, alt, className, eager, sizes, fit, parallax, scale, position }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const placeholder = blur[src];
  const layerProps = parallax ? { "data-parallax": String(parallax) } : {};
  return <div className={`media ${parallax ? "mediaParallax" : ""} ${loaded ? "mediaLoaded" : ""} ${failed ? "mediaFailed" : ""} ${className}`} {...layerProps}>
    {!failed && <Image src={src} alt={alt} fill sizes={sizes} priority={eager} loading={eager ? "eager" : "lazy"} placeholder={placeholder ? "blur" : "empty"} blurDataURL={placeholder} style={{ objectFit: fit, objectPosition: position }} data-scale={scale ? "" : undefined} onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
    {failed && <span className="mediaFallback" role="img" aria-label={alt}><span>GENTE.<i>ARTS</i></span><small>Vista previa no disponible</small></span>}
  </div>;
}
