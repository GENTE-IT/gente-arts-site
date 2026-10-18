"use client";

import { useEffect, useRef } from "react";

export default function Dialog({ children, onClose, labelId, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    const focusBefore = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (focusBefore instanceof HTMLElement && focusBefore.isConnected) focusBefore.focus();
    };
  }, []);

  return <dialog ref={ref} className={className} aria-labelledby={labelId} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {children}
  </dialog>;
}
