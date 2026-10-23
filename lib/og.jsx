import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * Link-preview images (Open Graph) drawn with next/og after the brand manual:
 * the banner (ch. 15: logo left, dupla right bleeding, raya on the bottom
 * edge) and the product thumbnail (darkened capture, category band, name,
 * version and raya). Dark is the canonical version.
 */
export const OG_SIZE = { width: 1200, height: 630 };
const MARGIN = 72;
export const C = { noche: "#0A0A0C", asfalto: "#16171B", hormigon: "#8C9099", papel: "#F5F4F0", coral: "#E04A3A", naranja: "#EE7B2F", ambar: "#F3B43C", pacifico: "#2D6CB3" };
const BANDS = [C.coral, C.naranja, C.ambar, C.pacifico];

// Logo oficial como imagen (public/brand), incrustado en base64 porque next/og no resuelve rutas relativas.
const brandUri = file => `data:image/png;base64,${readFileSync(join(process.cwd(), "public", "brand", file)).toString("base64")}`;
const ISOTIPO = { w: 587, h: 767 };
const HORIZONTAL = { w: 1108, h: 389 };

export function Dupla({ height = 320, style }) {
  return <img src={brandUri("isotipo.png")} width={Math.round((height * ISOTIPO.w) / ISOTIPO.h)} height={height} style={style} alt=""/>;
}
export function Raya({ height = 12, style }) {
  return <div style={{ display: "flex", width: "100%", height, ...style }}>{BANDS.map(band => <div key={band} style={{ flex: 1, background: band }}/>)}</div>;
}
// Logo horizontal en negativo (las piezas OG son siempre oscuras). `size` es la unidad x: la altura es 2x.
export function Wordmark({ size = 44, style }) {
  const height = size * 2;
  return <img src={brandUri("logo-horizontal-negativo.png")} width={Math.round((height * HORIZONTAL.w) / HORIZONTAL.h)} height={height} style={style} alt=""/>;
}

const FONT_SOURCES = [
  { name: "Unbounded", weight: 800, css: "https://fonts.googleapis.com/css2?family=Unbounded:wght@800" },
  { name: "Unbounded", weight: 400, css: "https://fonts.googleapis.com/css2?family=Unbounded:wght@400" },
  { name: "Manrope", weight: 500, css: "https://fonts.googleapis.com/css2?family=Manrope:wght@500" },
  { name: "JetBrains Mono", weight: 500, css: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500" },
];
let fontsPromise;
export function loadFonts() {
  fontsPromise ||= Promise.all(FONT_SOURCES.map(async font => {
    try {
      const css = await fetch(font.css).then(response => response.text());
      const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
      if (!url) return null;
      const data = await fetch(url).then(response => response.arrayBuffer());
      return { name: font.name, weight: font.weight, style: "normal", data };
    } catch { return null; }
  })).then(list => list.filter(Boolean));
  return fontsPromise;
}
export const imageOptions = fonts => ({ ...OG_SIZE, fonts: fonts.length ? fonts : undefined });

const mono = { fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase" };
const money = price => `${price.toFixed(2).replace(".", ",")} €`;
const captureUri = image => `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "public", image)).toString("base64")}`;

// Banner: logo and claim on the left, the dupla on the right bleeding past the
// bottom edge, the raya closing the piece.
export function SiteImage() {
  return <div style={{ width: "100%", height: "100%", display: "flex", background: C.noche, color: "#fff", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: MARGIN, top: 236, display: "flex", flexDirection: "column" }}>
      <Wordmark size={72}/>
      <div style={{ display: "flex", marginTop: 26, fontFamily: "Manrope", fontWeight: 500, fontSize: 28, color: C.hormigon }}>Scripts, mapeados y ropa para tu servidor.</div>
    </div>
    <div style={{ position: "absolute", right: MARGIN, top: MARGIN, display: "flex", ...mono, color: C.hormigon }}>gente.ws · @gentearts</div>
    <div style={{ position: "absolute", right: 60, bottom: 12, display: "flex" }}><Dupla height={470}/></div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex" }}><Raya height={12}/></div>
  </div>;
}

// Product thumbnail: capture darkened at the bottom, category band and label,
// name in Unbounded, version in mono, the raya as the floor.
export function ProductImage({ product, category }) {
  return <div style={{ width: "100%", height: "100%", display: "flex", background: C.noche, color: "#fff", position: "relative", overflow: "hidden" }}>
    <img src={captureUri(product.image)} width={1200} height={630} style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, objectFit: "cover" }} alt=""/>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", background: `linear-gradient(180deg, ${C.noche}33 0%, ${C.noche}66 45%, ${C.noche}f2 100%)` }}/>
    <div style={{ position: "absolute", left: MARGIN, top: MARGIN, display: "flex" }}><Wordmark size={34}/></div>
    <div style={{ position: "absolute", right: MARGIN, top: MARGIN, display: "flex", ...mono, textTransform: "none", fontSize: 20, padding: "10px 14px", background: C.asfalto, color: "#fff", borderRadius: 6 }}>v{product.version}</div>
    <div style={{ position: "absolute", left: MARGIN, bottom: 92, right: MARGIN, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, ...mono, color: "#fff" }}><div style={{ width: 28, height: 4, background: category.hex }}/>{category.label} · {product.gameLabel}</div>
      <div style={{ display: "flex", marginTop: 18, fontFamily: "Unbounded", fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{product.name}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, ...mono, color: C.hormigon }}><span>{product.resource} · {product.compat.join(" / ")}</span><span style={{ color: "#fff" }}>{money(product.price)}</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex" }}><Raya height={12}/></div>
  </div>;
}
