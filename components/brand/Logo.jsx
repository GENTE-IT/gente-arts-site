import Dupla from "./Dupla";
import Raya from "./Raya";

/*
 * The Horizonte logo system (manual v2.0, chapters 05–07). The wordmark is set
 * in Unbounded: GENTE in 800, the dot in 800 and Ámbar (Coral on light
 * backgrounds), ARTS in 400. `x` is the wordmark height and the unit for
 * every other measure. Versions:
 *   principal  — wordmark, the dupla 3x below, the raya under its feet
 *   horizontal — the dupla at 1.3x beside the name, one raya under both
 *   isotipo    — the dupla with its raya, no name
 *   monogram   — the G on the raya (favicon, avatar)
 * `mono` draws everything in currentColor and the raya as a flat bar.
 */
export function Wordmark({ className = "", mono = false }) {
  return <span className={`wordmark ${mono ? "wordmarkMono" : ""} ${className}`}>GENTE<span className="wordmarkDot">.</span><span className="wordmarkArts">ARTS</span></span>;
}

export default function Logo({ variant = "horizontal", x = 28, mono = false, className = "", title = "GENTE.ARTS" }) {
  const classes = `logo logo-${variant} ${mono ? "logoMono" : ""} ${className}`;
  const style = { "--x-base": typeof x === "number" ? `${x}px` : x }; // CSS reads --x from --x-base so media queries can resize
  if (variant === "wordmark") return <span className={classes} style={style} role="img" aria-label={title}><Wordmark mono={mono}/></span>;
  if (variant === "isotipo") return <span className={classes} style={style} role="img" aria-label={title}><Dupla/><Raya/></span>;
  if (variant === "monogram") return <span className={classes} style={style} role="img" aria-label={title}><span className="monogramG">G</span><Raya/></span>;
  if (variant === "principal") return <span className={classes} style={style} role="img" aria-label={title}><Wordmark mono={mono}/><Dupla/><Raya/></span>;
  return <span className={classes} style={style} role="img" aria-label={title}><Dupla/><Wordmark mono={mono}/><Raya/></span>;
}
