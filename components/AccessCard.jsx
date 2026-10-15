"use client";

import HoloCard from "./reactbits/HoloCard";
import Logo from "./brand/Logo";
import Stripes from "./brand/Stripes";
import Icon from "./Icon";
import { categoryOf } from "../data/products";
import { money } from "./ShopProvider";

/*
 * The access card: every product is sold as a physical-feeling card you buy,
 * activate and use to download the files. Built on React Bits' HoloCard:
 * featured products get the holographic foil, the rest keep the tilt and the
 * glossy glare. Front = artwork + identity, back = what you get.
 */
const PRESET_BY_CATEGORY = { map: "cosmos", script: "bursts", system: "shards", clothing: "glitter" };
const optimized = src => `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`;

export default function AccessCard({ product, flippable = false, flipped, onFlip, idle = false, tilt = true, className = "" }) {
  const category = categoryOf(product);
  const holo = Boolean(product.featured);

  const front = <div className="cardLayer cardFrontLayer">
    <span className="cardTint" aria-hidden="true"/>
    <span className="cardGrain" aria-hidden="true"/>
    <header className="cardHead"><Stripes width={34}/><span className="cardSerial">{product.serial}{holo && <b className="cardHoloTag">Holo</b>}</span></header>
    <div className="cardTitle"><small>{category.label} · {product.gameLabel}</small><h3>{product.name}</h3></div>
    <footer className="cardFoot"><Logo height={12}/><span>{product.edition}</span><strong>{money(product.price)}</strong></footer>
  </div>;

  const back = flippable ? <div className="cardLayer cardBackLayer">
    <span className="cardGrain" aria-hidden="true"/>
    <header className="cardHead"><Logo height={13} mono/><span className="cardSerial">{product.serial} · v{product.version}</span></header>
    <div className="cardBackBody">
      <p className="cardBackLabel">Esta tarjeta incluye</p>
      <ul>{product.features.map(item => <li key={item}><Icon name="check" size={13}/>{item}</li>)}</ul>
      <p className="cardCompat">{product.compat.map(tag => <span key={tag}>{tag}</span>)}</p>
    </div>
    <footer className="cardFoot cardFootBack"><span className="cardBarcode" aria-hidden="true"/><span>{product.delivery}</span></footer>
  </div> : undefined;

  return <div className={`accessCard ${holo ? "isHolo" : ""} ${className}`} style={{ "--accent": category.accent, "--accent-ink": category.ink }}>
    <HoloCard
      image={optimized(product.image)}
      alt={`Tarjeta de acceso ${product.name}`}
      ratio={1.586}
      width={2000}
      radius={22}
      preset={PRESET_BY_CATEGORY[product.category] || "bursts"}
      intensity={holo ? 0.8 : 0}
      edgeSparkle={holo ? 0.75 : 0}
      frame={holo ? 3 : 0}
      glare={holo ? 0.55 : 0.4}
      scale={1.15}
      tiltMax={tilt ? 12 : 0}
      hoverScale={tilt ? 1.03 : 1}
      idle={idle}
      back={back}
      flipped={flippable ? flipped : undefined}
      onFlip={onFlip}
    >{front}</HoloCard>
  </div>;
}
