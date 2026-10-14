"use client";

import Link, { useLinkStatus } from "next/link";

function PendingHint() {
  const { pending } = useLinkStatus();
  return pending ? <span className="linkPending" role="status"><span className="tinySpinner"/><span className="srOnly">Cargando página…</span></span> : null;
}

export default function StudioLink({ children, className = "", ...props }) {
  return <Link {...props} className={`studioLink ${className}`}>{children}<PendingHint/></Link>;
}
