export default function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
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
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
