import { WORDMARK_VIEWBOX, GENTE_PATH, ARTS_PATH, FIGURES_VIEWBOX, FIGURES_PATH } from "../components/brand/paths";

/*
 * Link-preview images (Open Graph), drawn with next/og from the brand vectors
 * so no font is needed for the mark. Layout follows the brand grid: 6% margin,
 * mark top-left, data bottom-right in mono, dark version as the canonical one.
 */
export const OG_SIZE = { width: 1200, height: 630 };
const MARGIN = 72; // 6% of 1200

const COLORS = { ink: "#141614", paper: "#f4f2ec", muted: "#9ba097", coral: "#e2693f", amber: "#f0b43c", blue: "#3f8fb0" };
const svgUri = svg => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
const stripesGradient = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${COLORS.coral}"/><stop offset=".38" stop-color="${COLORS.coral}"/><stop offset=".4" stop-color="${COLORS.amber}"/><stop offset=".62" stop-color="${COLORS.amber}"/><stop offset=".64" stop-color="${COLORS.blue}"/><stop offset="1" stop-color="${COLORS.blue}"/></linearGradient>`;

const wordmark = (color, mono) => svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEWBOX}"><defs>${stripesGradient}</defs><path d="${GENTE_PATH}" fill="${color}"/><path d="${ARTS_PATH}" fill="${mono ? color : "url(#g)"}"/></svg>`);
const figures = color => svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FIGURES_VIEWBOX}"><path d="${FIGURES_PATH}" fill="${color}"/></svg>`);
const [, , markW, markH] = WORDMARK_VIEWBOX.split(" ").map(Number);
const [, , figW, figH] = FIGURES_VIEWBOX.split(" ").map(Number);

export function Wordmark({ height = 40, color = "#fff", mono = false }) {
  return <img src={wordmark(color, mono)} width={(height * markW) / markH} height={height} alt=""/>;
}
export function Figures({ height = 320, color = "#fff" }) {
  return <img src={figures(color)} width={(height * figW) / figH} height={height} alt=""/>;
}

// Archivo (wide, 800) for display, Archivo 500 for text, JetBrains Mono for data.
// Fetched from Google Fonts as TTF; a failed fetch falls back to the default font.
const FONT_SOURCES = [
  { name: "Archivo", weight: 800, css: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,800" },
  { name: "Archivo", weight: 500, css: "https://fonts.googleapis.com/css2?family=Archivo:wght@500" },
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

const display = { fontFamily: "Archivo", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.92 };
const label = { fontFamily: "Archivo", fontWeight: 800, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase" };
const mono = { fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: 18, letterSpacing: "0.08em" };
const money = price => `${price.toFixed(2).replace(".", ",")} €`;

function Stripes({ width = 40 }) {
  const bar = { width, height: width * 0.2, borderRadius: 2 };
  return <div style={{ display: "flex", flexDirection: "column", gap: width * 0.08 }}>
    <div style={{ ...bar, background: COLORS.coral }}/><div style={{ ...bar, background: COLORS.amber }}/><div style={{ ...bar, background: COLORS.blue }}/>
  </div>;
}

export function SiteImage() {
  return <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#fff", padding: MARGIN, position: "relative" }}>
    <div style={{ position: "absolute", left: MARGIN, top: MARGIN, display: "flex" }}><Wordmark height={44}/></div>
    <div style={{ position: "absolute", right: MARGIN, top: MARGIN + 10, display: "flex", ...label, color: COLORS.muted }}>Estudio creativo digital</div>
    <div style={{ position: "absolute", left: MARGIN - 8, bottom: MARGIN - 6, display: "flex" }}><Figures height={330}/></div>
    <div style={{ position: "absolute", right: MARGIN, bottom: MARGIN + 86, display: "flex", flexDirection: "column", alignItems: "flex-end", ...display, fontSize: 92, textAlign: "right" }}>
      <span>Tu mundo.</span><span style={{ color: COLORS.blue }}>Tu manera.</span>
    </div>
    <div style={{ position: "absolute", right: MARGIN, bottom: MARGIN, display: "flex", ...mono, color: COLORS.muted }}>GTA V · FIVEM · GTA VI PRÓXIMAMENTE</div>
  </div>;
}

export function ProductImage({ product, category, fullName }) {
  const accent = category.hex;
  const card = { width: 520, height: 328 };
  return <div style={{ width: "100%", height: "100%", display: "flex", background: "#000", color: "#fff", position: "relative" }}>
    <div style={{ position: "absolute", left: MARGIN, top: MARGIN, display: "flex" }}><Wordmark height={36}/></div>
    <div style={{ position: "absolute", right: MARGIN, top: MARGIN + 8, display: "flex", ...label, color: COLORS.muted }}>Tarjeta de acceso</div>

    <div style={{ position: "absolute", left: MARGIN, top: 206, width: 480, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, ...label, color: accent }}><div style={{ width: 18, height: 3, background: accent, borderRadius: 2 }}/>{category.label} · {product.gameLabel}</div>
      <div style={{ display: "flex", marginTop: 22, ...display, fontSize: 66 }}>{fullName}</div>
      <div style={{ display: "flex", marginTop: 24, fontFamily: "Archivo", fontWeight: 500, fontSize: 22, lineHeight: 1.4, color: "#c9cec5" }}>{product.description}</div>
    </div>
    <div style={{ position: "absolute", left: MARGIN, bottom: MARGIN, display: "flex", ...display, fontSize: 44 }}>{money(product.price)}</div>
    <div style={{ position: "absolute", right: MARGIN, bottom: MARGIN, display: "flex", ...mono, color: COLORS.muted }}>{product.serial} · V{product.version}</div>

    <div style={{ position: "absolute", right: MARGIN, top: 150, ...card, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "26px 30px", borderRadius: 26, background: `linear-gradient(150deg, ${accent}5c 0%, ${COLORS.ink} 46%, #1d201d 100%)`, boxShadow: "0 40px 80px rgba(0,0,0,.6)", transform: "rotate(-6deg)" }}>
      <div style={{ position: "absolute", left: 30, right: 30, top: 0, height: 5, background: accent, borderRadius: "0 0 3px 3px" }}/>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><Stripes width={44}/><span style={{ ...mono, fontSize: 15, color: "#d6dbd3" }}>{product.serial}</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ ...label, fontSize: 13, color: "#d6dbd3" }}>{category.label} · {product.gameLabel}</span>
        <span style={{ ...display, fontSize: 46, marginTop: 10, maxWidth: 400 }}>{product.name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Archivo", fontWeight: 800, fontSize: 15, color: "#d6dbd3" }}>
        <Wordmark height={14} mono/><span>{product.volume} · {product.edition}</span><span style={{ color: "#fff", fontSize: 20 }}>{money(product.price)}</span>
      </div>
    </div>
  </div>;
}
