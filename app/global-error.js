"use client";

import "./globals.css";

export default function GlobalError({ retry, reset }) {
  return <html lang="es"><body><title>No hemos podido cargar la web — GENTE.ARTS</title><main className="errorPage runtimeError"><a className="brand" href="/">GENTE.<span className="brandArts">ARTS</span></a><p className="eyebrow">PAUSA INESPERADA</p><h1>Un momento.<br/>Volvemos contigo.</h1><p>Ha ocurrido un error al cargar la web.</p><div className="errorActions"><button className="button darkButton" onClick={() => (retry || reset)()}>Reintentar ↻</button><a className="button outlineButton" href="/">Volver al inicio ↗</a></div></main></body></html>;
}
