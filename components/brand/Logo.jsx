import { useId } from "react";
import { WORDMARK_VIEWBOX, GENTE_PATH, ARTS_PATH } from "./paths";

// Traced glyph bounds: GENTE spans x 5-1124, the dot 1139-1191, ARTS 1210-1796 (y 61-201).
const GENTE_BOX = "0 0 1200 217";
const ARTS_BOX = "1205 55 595 155";

/*
 * The GENTE.ARTS wordmark, traced from the original artwork. "GENTE." takes
 * currentColor; "ARTS" carries the three brand stripes unless `mono` is set.
 * `stacked` draws the two words on separate lines (hero composition).
 */
export default function Logo({ height = 22, mono = false, stacked = false, className = "", title = "GENTE.ARTS" }) {
  const id = useId().replace(/:/g, "");
  const gradient = !mono && <defs><linearGradient id={`stripes-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--coral)"/><stop offset=".38" stopColor="var(--coral)"/><stop offset=".4" stopColor="var(--amber)"/><stop offset=".62" stopColor="var(--amber)"/><stop offset=".64" stopColor="var(--blue)"/><stop offset="1" stopColor="var(--blue)"/></linearGradient></defs>;
  const artsFill = mono ? "currentColor" : `url(#stripes-${id})`;
  if (stacked) {
    return <span className={`logo logoStacked ${className}`} role="img" aria-label={title}>
      <svg viewBox={GENTE_BOX} height={height} width={(height * 1200) / 217} aria-hidden="true"><path d={GENTE_PATH} fill="currentColor"/><path d={ARTS_PATH} fill={mono ? "currentColor" : "var(--blue)"}/></svg>
      <svg viewBox={ARTS_BOX} height={height * 0.8} width={(height * 0.8 * 595) / 155} aria-hidden="true">{gradient}<path d={ARTS_PATH} fill={artsFill}/></svg>
    </span>;
  }
  const [, , w, h] = WORDMARK_VIEWBOX.split(" ").map(Number);
  return <svg className={`logo ${className}`} viewBox={WORDMARK_VIEWBOX} height={height} width={(height * w) / h} role="img" aria-label={title}>
    {gradient}
    <path d={GENTE_PATH} fill="currentColor"/>
    <path d={ARTS_PATH} fill={artsFill}/>
  </svg>;
}
