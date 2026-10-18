"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

/*
 * Light / dark theme. The choice lives in localStorage ("gente-theme") and is
 * applied as data-theme on <html>. A tiny inline script in the layout applies
 * it before the first paint so there is no flash; this provider only keeps
 * React in sync and exposes the toggle.
 */
const ThemeContext = createContext({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);
export const THEME_KEY = "gente-theme";

// data-theme on <html> is the source of truth; React subscribes to it instead of copying it into
// state from an effect. The server snapshot is "dark" (the HTML the server renders), so hydration
// matches and a stored light theme is picked up right after.
const subscribe = onChange => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getSnapshot = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerSnapshot = () => "dark";

export default function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = () => {
    // Read the DOM, not the rendered value, so consecutive clicks before a re-render still alternate.
    const next = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  };
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

// Runs before hydration (see app/layout.js): stored choice, else dark (the manual's default).
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"){t="dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;
