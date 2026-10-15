"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AccessCard from "./AccessCard";
import Dialog from "./Dialog";
import Icon from "./Icon";
import { money, useShop } from "./ShopProvider";
import { categoryOf } from "../data/products";

const filters = [["all", "Todo"], ["map", "Mapeados"], ["script", "Scripts"], ["system", "Sistemas"], ["clothing", "Ropa"]];
const normalize = value => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// Opens a product when the URL carries ?p=<id> (used by the featured rail on the home page).
function DeepLink({ products, onSelect }) {
  const params = useSearchParams();
  const id = params.get("p");
  useEffect(() => { const match = products.find(product => product.id === id); if (match) onSelect(match); }, [id, products, onSelect]);
  return null;
}

export default function ProductCatalog({ products }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const { cart, add } = useShop();
  const visible = useMemo(() => {
    const filtered = products.filter(product => (filter === "all" || product.category === filter) && normalize(`${product.name} ${categoryOf(product).label} ${product.description}`).includes(normalize(query)));
    return sort === "price-asc" ? filtered.sort((a, b) => a.price - b.price) : sort === "price-desc" ? filtered.sort((a, b) => b.price - a.price) : sort === "name" ? filtered.sort((a, b) => a.name.localeCompare(b.name, "es")) : filtered;
  }, [products, filter, query, sort]);
  const reset = () => { setFilter("all"); setQuery(""); setSort("featured"); };
  // Stable identity: DeepLink re-runs its effect when this changes, which would reset the flip.
  const open = useCallback(product => { setFlipped(false); setSelected(product); }, []);

  return <section className="catalogPageStore" id="catalogo" aria-labelledby="catalog-title">
    <Suspense fallback={null}><DeepLink products={products} onSelect={open}/></Suspense>
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">La colección</p><h2 id="catalog-title" data-split>Siete tarjetas para empezar.</h2></div><p data-reveal>Cada tarjeta da acceso a un recurso, su documentación y sus actualizaciones.</p></div>
    <div className="catalogControls" data-reveal="fade"><div className="filters" role="group" aria-label="Filtrar catálogo">{filters.map(([value, label]) => <button className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}<span>{products.filter(product => value === "all" || product.category === value).length}</span></button>)}</div><label className="search"><Icon name="search" size={18}/><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Buscar una tarjeta…" aria-label="Buscar producto"/></label></div>
    <div className="catalogMeta"><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "tarjeta" : "tarjetas"} <span>· Precios de muestra</span></p><label>Ordenar por <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Ordenar productos"><option value="featured">Selección del estudio</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A–Z</option></select></label></div>
    <div className="productGrid">{visible.map((product, index) => <article className="productCard" key={product.id} style={{ "--i": index }}>
      <button className="productOpen" onClick={() => open(product)} aria-label={`Ver la tarjeta de ${product.name}`}><AccessCard product={product}/></button>
      <div className="productInfo"><div><h3><button onClick={() => open(product)}>{product.name}</button></h3><p className="productSummary">{product.description}</p></div><button className={`quickAdd ${cart.includes(product.id) ? "isAdded" : ""}`} onClick={() => add(product)} aria-label={cart.includes(product.id) ? `${product.name} ya está en la cesta` : `Añadir ${product.name} a la cesta`}><Icon name={cart.includes(product.id) ? "check" : "plus"} size={18}/></button></div>
    </article>)}</div>
    {!visible.length && <div className="emptyResults"><Icon name="search" size={32}/><h3>No encontramos esa tarjeta.</h3><p>Prueba con otro nombre o vuelve a la colección completa.</p><button className="button darkButton" onClick={reset}>Limpiar filtros <Icon name="refresh" size={18}/></button></div>}
    <div className="catalogNotice" data-reveal="fade"><span className="statusDot"/><p>Estamos preparando la apertura. Los precios son de muestra y las tarjetas todavía no se pueden comprar ni activar.</p></div>
    {selected && <Dialog className="productDialog" labelId="product-title" onClose={() => setSelected(null)}><div className="productDialogInner">
      <button className="iconButton dialogClose" onClick={() => setSelected(null)} aria-label="Cerrar detalles"><Icon name="close"/></button>
      <div className="modalStage"><AccessCard product={selected} flippable flipped={flipped} onFlip={setFlipped}/><button className="flipButton" onClick={() => setFlipped(value => !value)} aria-pressed={flipped}><Icon name="refresh" size={16}/>{flipped ? "Ver el frente" : "Girar la tarjeta"}</button></div>
      <div className="modalBody">
        <p className="kicker">{categoryOf(selected).label} · {selected.gameLabel} · {selected.serial}</p>
        <h2 id="product-title">{selected.name}</h2>
        <p className="description">{selected.description}</p>
        <dl className="specs"><div><dt>Versión</dt><dd>v{selected.version}</dd></div><div><dt>Compatible con</dt><dd>{selected.compat.join(" · ")}</dd></div><div><dt>Entrega</dt><dd>{selected.delivery}</dd></div><div><dt>Edición</dt><dd>{selected.edition}</dd></div></dl>
        <div className="modalPrice"><strong>{money(selected.price)}</strong><span>Precio de muestra</span></div>
        <button className="button darkButton full" onClick={() => add(selected)}>{cart.includes(selected.id) ? "En tu selección" : "Guardar en mi cesta"}<Icon name={cart.includes(selected.id) ? "check" : "plus"}/></button>
        <span className="srOnly" role="status" aria-live="polite">{cart.includes(selected.id) ? `${selected.name} guardado en tu cesta.` : ""}</span>
        <p className="previewNote">La licencia y las condiciones de uso se comunican antes de habilitar la compra de cada tarjeta.</p>
      </div>
    </div></Dialog>}
  </section>;
}
