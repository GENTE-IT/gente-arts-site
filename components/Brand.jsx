export default function Brand({ footer = false }) {
  return <a className={`brand ${footer ? "brandFooter" : ""}`} href="#top" aria-label="GENTE.ARTS, inicio">
    <span className="brandGente">GENTE.</span><span className="brandArts">ARTS</span>
  </a>;
}
