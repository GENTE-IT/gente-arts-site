// The three brand stripes (coral, amber, blue): the signature mark reused as
// card chip, divider and favicon motif.
export default function Stripes({ width = 28, vertical = false, className = "" }) {
  return <span className={`stripes ${vertical ? "stripesVertical" : ""} ${className}`} style={{ "--stripes-size": `${width}px` }} aria-hidden="true"><i/><i/><i/></span>;
}
