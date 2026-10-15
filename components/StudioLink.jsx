"use client";

import Link, { useLinkStatus } from "next/link";
import LatticeLoader from "./reactbits/LatticeLoader";

// Shows the lattice while the next page is still loading after a click.
function PendingHint() {
  const { pending } = useLinkStatus();
  return pending ? <span className="linkPending"><LatticeLoader label="Cargando" pattern="orbit" cellSize={4} gap={2} fontSize={11} showTimer={false}/></span> : null;
}

export default function StudioLink({ children, className = "", ...props }) {
  return <Link {...props} className={`studioLink ${className}`}>{children}<PendingHint/></Link>;
}
