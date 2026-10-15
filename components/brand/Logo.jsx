import { useId } from "react";
import { WORDMARK_VIEWBOX, GENTE_PATH, ARTS_PATH } from "./paths";

/*
 * The GENTE.ARTS wordmark, traced from the original artwork. "GENTE." takes
 * currentColor; "ARTS" carries the three brand stripes unless `mono` is set.
 */
export default function Logo({ height = 22, mono = false, className = "", title = "GENTE.ARTS" }) {
  const id = useId().replace(/:/g, "");
  const [, , w, h] = WORDMARK_VIEWBOX.split(" ").map(Number);
  return <svg className={`logo ${className}`} viewBox={WORDMARK_VIEWBOX} height={height} width={(height * w) / h} role="img" aria-label={title}>
    {!mono && <defs><linearGradient id={`stripes-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--coral)"/><stop offset=".38" stopColor="var(--coral)"/><stop offset=".4" stopColor="var(--amber)"/><stop offset=".62" stopColor="var(--amber)"/><stop offset=".64" stopColor="var(--blue)"/><stop offset="1" stopColor="var(--blue)"/></linearGradient></defs>}
    <path d={GENTE_PATH} fill="currentColor"/>
    <path d={ARTS_PATH} fill={mono ? "currentColor" : `url(#stripes-${id})`}/>
  </svg>;
}
