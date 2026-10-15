import Link from "./StudioLink";
import Logo from "./brand/Logo";

export default function Brand({ footer = false, height = 20 }) {
  return <Link className={`brand ${footer ? "brandFooter" : ""}`} href="/" aria-label="GENTE.ARTS, inicio"><Logo height={height}/></Link>;
}
