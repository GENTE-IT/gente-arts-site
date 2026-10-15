"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { products, categoryOf } from "../data/products";
import Dialog from "./Dialog";
import Media from "./Media";
import Icon from "./Icon";

const ShopContext = createContext(null);
export const money = value => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
export const useShop = () => useContext(ShopContext);
const validCart = value => Array.isArray(value) ? [...new Set(value)].filter(id => products.some(product => product.id === id)) : [];

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    try { setCart(validCart(JSON.parse(localStorage.getItem("gente-cart") || "[]"))); } catch {}
    setReady(true);
    const sync = event => {
      if (event.key === "gente-cart" || event.key === null) {
        try { setCart(validCart(JSON.parse(event.newValue || "[]"))); } catch { setCart([]); }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem("gente-cart", JSON.stringify(cart)); } catch {} } }, [cart, ready]);
  useEffect(() => { setOpen(false); setNotice(""); }, [pathname]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(""), 3500); return () => clearTimeout(timer); }, [notice]);

  const selected = cart.map(id => products.find(product => product.id === id)).filter(Boolean);
  const add = product => {
    setCart(current => current.includes(product.id) ? current : [...current, product.id]);
    setNotice(cart.includes(product.id) ? "Este recurso ya está en tu selección." : `${product.name} añadido a tu selección.`);
  };
  const subject = encodeURIComponent("Consulta sobre mi selección GENTE.ARTS");
  const body = encodeURIComponent("Hola, me gustaría recibir información sobre estos recursos:\n\n" + selected.map(product => "• " + product.name).join("\n"));
  return <ShopContext.Provider value={{ cart, add, openCart: () => setOpen(true) }}>
    {children}
    <div className={`toast ${notice ? "toastVisible" : ""}`} role="status" aria-live="polite">{notice && <><Icon name="check"/><span>{notice}</span></>}</div>
    {open && <Dialog onClose={() => setOpen(false)} className="cartDialog" labelId="cart-title">
      <div className="cartInner">
        <header className="drawerHead"><div><p className="kicker">Tu selección · {String(selected.length).padStart(2, "0")}</p><h2 id="cart-title">Tu cesta.</h2></div><button className="iconButton" onClick={() => setOpen(false)} aria-label="Cerrar cesta"><Icon name="close"/></button></header>
        {selected.length ? <>
          <div className="drawerItems">{selected.map(product => <article key={product.id}><Media src={product.image} alt={product.name} sizes="100px"/><div><small>{categoryOf(product).label} · {product.serial}</small><h3>{product.name}</h3><strong>{money(product.price)}</strong></div><button className="iconButton" onClick={() => setCart(current => current.filter(id => id !== product.id))} aria-label={`Quitar ${product.name}`}><Icon name="close" size={16}/></button></article>)}</div>
          <div className="drawerFooter"><div className="cartTotal"><span>Total de muestra</span><strong>{money(selected.reduce((total, product) => total + product.price, 0))}</strong></div><p>Estamos preparando la apertura. Puedes guardar tu selección y consultar la disponibilidad por email.</p><a className="button darkButton full" href={`mailto:hola@gente.arts?subject=${subject}&body=${body}`}>Consultar selección <Icon name="diagonal"/></a><small>Las compras y los cobros aún no están habilitados.</small></div>
        </> : <div className="cartEmpty"><span className="emptyBag"><Icon name="bag" size={36}/></span><h3>Espacio para tus ideas.</h3><p>Explora GTA V y guarda los recursos que te interesan.</p><button className="button darkButton" onClick={() => setOpen(false)}>Seguir explorando <Icon name="arrow"/></button></div>}
      </div>
    </Dialog>}
  </ShopContext.Provider>;
}
