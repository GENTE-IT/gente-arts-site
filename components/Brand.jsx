import Link from "./StudioLink";
import Logo from "./brand/Logo";

// Header: the horizontal version at 28 px (manual, chapter 15). Footer: the
// principal version, since there is vertical room for it.
export default function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? "brandFooter" : ""}`} href="/" aria-label="GENTE.ARTS, inicio">{footer ? <Logo variant="principal" x={26}/> : <Logo variant="horizontal" x={28}/>}</Link>;
}
