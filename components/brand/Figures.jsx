import { FIGURES_VIEWBOX, FIGURES_PATH } from "./paths";

// The two figures from the original logo, as a silhouette in currentColor.
export default function Figures({ height = 120, className = "" }) {
  const [, , w, h] = FIGURES_VIEWBOX.split(" ").map(Number);
  return <svg className={`figures ${className}`} viewBox={FIGURES_VIEWBOX} height={height} width={(height * w) / h} aria-hidden="true"><path d={FIGURES_PATH} fill="currentColor"/></svg>;
}
