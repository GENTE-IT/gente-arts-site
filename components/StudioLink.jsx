"use client";

import Link, { useLinkStatus } from "next/link";

// Shows the lattice while the next page is still loading after a click.
function PendingHint() {
  const { pending } = useLinkStatus();
  return pending ? <span className="linkPending"><span className="tinySpinner"/>Cargando</span> : null;
}

export default function StudioLink({ children, className = "", ...props }) {
  return <Link {...props} className={`studioLink ${className}`}>{children}<PendingHint/></Link>;
}
