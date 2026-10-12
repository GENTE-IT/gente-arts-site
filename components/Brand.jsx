import Link from "next/link";

export default function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? "brandFooter" : ""}`} href="/" aria-label="GENTE.ARTS, inicio">
    <span className="brandGente">GENTE.</span><span className="brandArts">ARTS</span>
  </Link>;
}
