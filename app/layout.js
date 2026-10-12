import "./globals.css";

export const metadata = {
  title: "GENTE.ARTS — GTA Digital Store",
  description: "Scripts, mapeados y sistemas premium para GTA V y FiveM. GTA VI próximamente."
};

export const viewport = { themeColor: "#f4f4f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
