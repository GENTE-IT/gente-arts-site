"use client";

import Image from "next/image";
import { useState } from "react";

export default function Media({ src, alt, className = "", eager = false, sizes = "100vw", fit = "cover" }) {
  return <MediaAsset key={src} {...{ src, alt, className, eager, sizes, fit }}/>;
}

function MediaAsset({ src, alt, className, eager, sizes, fit }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className={`media ${loaded ? "mediaLoaded" : ""} ${failed ? "mediaFailed" : ""} ${className}`}>
    {!failed && <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} style={{ objectFit: fit }} onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
    {!loaded && !failed && <span className="mediaShimmer" aria-hidden="true"/>}
    {failed && <span className="mediaFallback" role="img" aria-label={alt}><span>GENTE.<i>ARTS</i></span><small>Vista previa no disponible</small></span>}
  </div>;
}
