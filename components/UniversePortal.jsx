import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";

const worlds = [
  { href: "/gta-v", label: "GTA V", place: "LOS SANTOS & BLAINE COUNTY", image: "/assets/gta-v-art.jpg", note: "Explorar la colección", index: "01", status: "CATÁLOGO ABIERTO", position: "50% 20%" },
  { href: "/gta-vi", label: "GTA VI", place: "LEONIDA / VICE CITY", image: "/assets/gta-vi-key.jpg", note: "Descubrir lo próximo", index: "02", status: "PRÓXIMAMENTE", position: "50% 50%" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">Elige tu universo</p><h2 data-split>¿Dónde empezamos?</h2></div><p data-reveal>Dos mundos. <br/>La misma forma de crear.</p></div>
    <div className="gameCategories" data-reveal-group>{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`Explorar ${world.label}`}>
      <div className="gameVisual" data-parallax-box data-img-reveal><Media src={world.image} alt={`Ilustración de ${world.label}`} sizes="(max-width: 700px) 100vw, 50vw" parallax={0.08} position={world.position}/><span className="gameShade"/><span className="gameBadge">{world.status !== "PRÓXIMAMENTE" && <i/>}{world.status}</span><div className="gameTitle"><small>{world.place}</small><h3>{world.label}</h3></div><span className="gameNumber">{world.index}</span></div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
