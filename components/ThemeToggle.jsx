"use client";

import Icon from "./Icon";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return <button className={`iconButton themeToggle ${className}`} onClick={toggle} aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"} aria-pressed={dark} title={dark ? "Tema claro" : "Tema oscuro"}>
    <span className="themeToggleIcon" aria-hidden="true"><Icon name={dark ? "sun" : "moon"} size={18}/></span>
  </button>;
}
