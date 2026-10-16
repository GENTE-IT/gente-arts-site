import { DUPLA_VIEWBOX, DUPLA_PATH } from "./dupla";

// La dupla as an inline SVG in currentColor. Width follows the height.
export default function Dupla({ height, className = "", style }) {
  const [, , w, h] = DUPLA_VIEWBOX.split(" ").map(Number);
  const size = height ? { height, width: (height * w) / h } : {};
  return <svg className={`dupla ${className}`} viewBox={DUPLA_VIEWBOX} {...size} style={style} aria-hidden="true"><path d={DUPLA_PATH} fill="currentColor" fillRule="evenodd"/></svg>;
}
