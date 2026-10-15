"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Media from "./Media";
import Dialog from "./Dialog";
import Icon from "./Icon";
import { money, useShop } from "./ShopProvider";

const filters = [["all", "Todo"], ["map", "Mapeados"], ["script", "Scripts"], ["clothing", "Ropa"], ["system", "Sistemas"]];
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
  const { cart, add } = useShop();
  const visible = useMemo(() => {
    const filtered = products.filter(product => (filter === "all" || product.category === filter) && normalize(`${product.name} ${product.label} ${product.description}`).includes(normalize(query)));
    return sort === "price-asc" ? filtered.sort((a, b) => a.price - b.price) : sort === "price-desc" ? filtered.sort((a, b) => b.price - a.price) : sort === "name" ? filtered.sort((a, b) => a.name.localeCompare(b.name, "es")) : filtered;
  }, [products, filter, query, sort]);
  const reset = () => { setFilter("all"); setQuery(""); setSort("featured"); };

  return <section className="catalogPageStore" id="catalogo" aria-labelledby="catalog-title">
    <Suspense fallback={null}><DeepLink products={products} onSelect={setSelected}/></Suspense>
    <div className="sectionHeading"><div><p className="eyebrow" data-reveal="fade"><span className="colorDash"/> LA COLECCIÓN</p><h2 id="catalog-title" data-split>Dale forma a tu mundo.</h2></div><p data-reveal>Mapeados, scripts y algo más. <br/>Encuentra tu siguiente pieza.</p></div>
    <div className="catalogControls" data-reveal="fade"><div className="filters" role="group" aria-label="Filtrar catálogo">{filters.map(([value, label]) => <button className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}<span>{products.filter(product => value === "all" || product.category === value).length}</span></button>)}</div><label className="search"><Icon name="search" size={18}/><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Buscar un recurso…" aria-label="Buscar producto"/></label></div>
    <div className="catalogMeta"><p role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "recurso" : "recursos"} <span>· Colección de muestra</span></p><label>Ordenar por <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Ordenar productos"><option value="featured">Selección del estudio</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="name">Nombre A–Z</option></select></label></div>
    <div className="productGrid">{visible.map((product, index) => <article className="productCard" key={product.id} style={{ "--i": index }}>
      <div className="productVisual"><button className="productOpen" onClick={() => setSelected(product)} aria-label={`Ver detalles de ${product.name}`}><Media src={product.image} alt={product.name} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"/><span className="productShade"/><span className="productView">Ver recurso <Icon name="diagonal" size={16}/></span></button><span className="productTag">{product.label}</span><button className={`quickAdd ${cart.includes(product.id) ? "isAdded" : ""}`} onClick={() => add(product)} aria-label={cart.includes(product.id) ? `${product.name} ya está en la cesta` : `Añadir ${product.name} a la cesta`}><Icon name={cart.includes(product.id) ? "check" : "plus"} size={18}/></button></div>
      <div className="productInfo"><div><small>GTA V / {product.number}</small><h3><button onClick={() => setSelected(product)}>{product.name}</button></h3></div><strong>{money(product.price)}</strong></div><p className="productSummary">{product.description}</p>
    </article>)}</div>
    {!visible.length && <div className="emptyResults"><Icon name="search" size={32}/><h3>No encontramos esa pieza.</h3><p>Prueba con otro nombre o explora la colección completa.</p><button className="button darkButton" onClick={reset}>Limpiar filtros <Icon name="refresh" size={18}/></button></div>}
    <div className="catalogNotice" data-reveal="fade"><span className="statusDot"/><p>Estamos preparando la apertura. Los productos y precios son de muestra; todavía no se pueden comprar.</p></div>
    {selected && <Dialog className="productDialog" labelId="product-title" onClose={() => setSelected(null)}><div className="productDialogInner"><button className="iconButton dialogClose" onClick={() => setSelected(null)} aria-label="Cerrar detalles"><Icon name="close"/></button><Media className="modalImage" src={selected.image} alt={selected.name} sizes="(max-width: 800px) 100vw, 55vw" eager/><div className="modalBody"><p className="eyebrow">{selected.label} / GTA V / {selected.number}</p><h2 id="product-title">{selected.name}</h2><p className="description">{selected.description}</p><div className="modalPrice"><strong>{money(selected.price)}</strong><span>PRECIO DE MUESTRA</span></div><button className="button darkButton full" onClick={() => add(selected)}>{cart.includes(selected.id) ? "En tu selección" : "Guardar en mi cesta"}<Icon name={cart.includes(selected.id) ? "check" : "plus"}/></button><span className="srOnly" role="status" aria-live="polite">{cart.includes(selected.id) ? `${selected.name} guardado en tu cesta.` : ""}</span><ul>{selected.features.map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul><p className="previewNote">Vista previa del catálogo. Consulta los detalles y la disponibilidad antes de comprar.</p></div></div></Dialog>}
  </section>;
}
