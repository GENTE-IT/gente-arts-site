/*
 * La raya: four equal bands in a fixed order (Coral, Naranja, Ámbar, Pacífico),
 * no gradients, no rounded corners. It is the brand's floor: it sits at the
 * bottom edge of a piece, under the dupla's feet or as the closing of a block.
 * One raya per piece. `band` renders a single band as a category label.
 */
export default function Raya({ className = "", height, band, style }) {
  if (band) return <i className={`band ${className}`} style={{ "--band": band, ...style }} aria-hidden="true"/>;
  return <span className={`raya ${className}`} style={{ height, ...style }} aria-hidden="true"><i/><i/><i/><i/></span>;
}
