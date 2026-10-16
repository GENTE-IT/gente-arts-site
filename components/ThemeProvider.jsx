"use client";

import { createContext, useContext, useEffect, useState } from "react";

/*
 * Light / dark theme. The choice lives in localStorage ("gente-theme") and is
 * applied as data-theme on <html>. A tiny inline script in the layout applies
 * it before the first paint so there is no flash; this provider only keeps
 * React in sync and exposes the toggle.
 */
const ThemeContext = createContext({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);
export const THEME_KEY = "gente-theme";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);
  const toggle = () => setTheme(current => {
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    return next;
  });
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

// Runs before hydration (see app/layout.js): stored choice, else dark (the manual's default).
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"){t="dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;
