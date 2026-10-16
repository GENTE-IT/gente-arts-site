export default function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
  up: <path d="M12 19V5M5 12l7-7 7 7"/>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    diagonal: <path d="M6 18 18 6M6 6h12v12"/>,
    down: <path d="M12 4v16m-6-6 6 6 6-6"/>,
    bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    menu: <path d="M4 8h16M4 16h16"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    back: <path d="M19 12H5m6-6-6 6 6 6"/>,
    refresh: <><path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5"/></>,
    pause: <path d="M8 5v14M16 5v14"/>,
    play: <path d="m8 4 12 8-12 8V4Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
    tiktok: <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5M14 3a5 5 0 0 0 5 5"/>,
    youtube: <><path d="M3 8.5c0-1.4 1.1-2.5 2.5-2.5h13C19.9 6 21 7.1 21 8.5v7c0 1.4-1.1 2.5-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7Z"/><path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none"/></>,
    discord: <><path d="M8.5 17.5C6 17 4.5 15.5 4.5 15.5c.5-5 2-8.5 2-8.5 2-1 3.5-1 3.5-1l.5 1h3l.5-1s1.5 0 3.5 1c0 0 1.5 3.5 2 8.5 0 0-1.5 1.5-4 2l-1-1.5"/><path d="M8.5 17.5 9.5 16M8 13.5h.01M16 13.5h.01"/></>,
    x: <path d="m4 4 16 16M20 4 4 20"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
