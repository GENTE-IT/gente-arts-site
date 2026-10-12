"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const money = value => new Intl.NumberFormat("es-ES", { style:"currency", currency:"EUR" }).format(value);
const filters = [["all","TODO"],["map","MAPEADOS"],["script","SCRIPTS"],["clothing","ROPA"],["system","SISTEMAS"]];

export default function ProductCatalog({ products }) {
  const [filter,setFilter]=useState("all");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [cart,setCart]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [ready,setReady]=useState(false);
  useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("gente-cart")||"[]"))}catch{}setReady(true)},[]);
  useEffect(()=>{if(ready)localStorage.setItem("gente-cart",JSON.stringify(cart))},[cart,ready]);
  useEffect(()=>{document.body.classList.toggle("locked",Boolean(selected)||cartOpen);return()=>document.body.classList.remove("locked")},[selected,cartOpen]);
  const visible=useMemo(()=>products.filter(product=>(filter==="all"||product.category===filter)&&(`${product.name} ${product.label}`.toLowerCase().includes(query.toLowerCase()))),[filter,query,products]);
  const cartProducts=cart.map(id=>products.find(product=>product.id===id)).filter(Boolean);
  const add=id=>setCart(current=>current.includes(id)?current:[...current,id]);
  const remove=id=>setCart(current=>current.filter(item=>item!==id));

  return <section className="catalogPageStore">
    <div className="catalogHeading"><p>GTA V / CATÁLOGO</p><h2>Construye<br/>a tu manera.</h2></div>
    <div className="catalogControls"><div className="filters" aria-label="Filtrar catálogo">{filters.map(([value,label])=><button className={filter===value?"active":""} onClick={()=>setFilter(value)} key={value}>{label}{value==="all"&&<sup>{String(products.length).padStart(2,"0")}</sup>}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={event=>setQuery(event.target.value)} type="search" placeholder="BUSCAR PRODUCTO" aria-label="Buscar producto"/></label></div>
    <div className="productGrid">{visible.map(product=><article className="productCard" key={product.id} onClick={()=>setSelected(product)}><div className="productVisual"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 100vw, 50vw"/><span>{product.label} / {product.gameLabel}</span><button onClick={event=>{event.stopPropagation();add(product.id)}} aria-label={`Añadir ${product.name}`}>＋</button></div><div className="productInfo"><div><small>{product.number} / {String(products.length).padStart(2,"0")}</small><h3>{product.name}</h3></div><strong>{money(product.price)}<small>PAGO ÚNICO</small></strong></div></article>)}</div>
    {!visible.length&&<p className="empty">Todavía no hay productos en esta combinación.</p>}
    <button className="floatingCart" onClick={()=>setCartOpen(true)}>CARRITO <span>{cart.length}</span></button>
    {selected&&<div className="modal"><button className="scrim" onClick={()=>setSelected(null)} aria-label="Cerrar"/><article className="modalCard" role="dialog" aria-modal="true"><button className="close" onClick={()=>setSelected(null)}>×</button><div className="modalImage"><Image src={selected.image} alt={selected.name} fill sizes="60vw"/></div><div className="modalBody"><p>{selected.label} / {selected.gameLabel}</p><h2>{selected.name}</h2><p className="description">{selected.description}</p><strong className="modalPrice">{money(selected.price)}<small>PAGO ÚNICO · IVA EN CHECKOUT</small></strong><button className="button darkButton full" onClick={()=>{add(selected.id);setSelected(null);setCartOpen(true)}}>AÑADIR AL CARRITO <b>＋</b></button><ul>{selected.features.map(item=><li key={item}>✓ {item}</li>)}</ul></div></article></div>}
    <div className={`drawer ${cartOpen?"open":""}`} aria-hidden={!cartOpen}><div className="drawerHead"><div><small>TU SELECCIÓN</small><h2>Carrito</h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div><div className="drawerItems">{cartProducts.map(product=><article key={product.id}><Image src={product.image} alt="" width={96} height={74}/><div><small>{product.label}</small><h3>{product.name}</h3><strong>{money(product.price)}</strong></div><button onClick={()=>remove(product.id)}>×</button></article>)}</div>{cartProducts.length?<div className="drawerFooter"><div><span>TOTAL</span><strong>{money(cartProducts.reduce((total,product)=>total+product.price,0))}</strong></div><button className="button darkButton full">CONTINUAR COMPRA ↗</button><small>Integración con Tebex disponible en la siguiente fase.</small></div>:<div className="cartEmpty"><span>0</span><p>Tu carrito está esperando ideas.</p></div>}</div>
    {cartOpen&&<button className="drawerScrim" onClick={()=>setCartOpen(false)} aria-label="Cerrar carrito"/>}
  </section>;
}
