import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";

const worlds = [
  { href: "/gta-v", label: "GTA V", place: "LOS SANTOS & MÁS ALLÁ", image: "/assets/gta-v-art.jpg", note: "Explorar colección", index: "01", status: "CATÁLOGO" },
  { href: "/gta-vi", label: "GTA VI", place: "EL SIGUIENTE CAPÍTULO", image: "/assets/gta-vi-art.jpg", note: "Descubrir lo próximo", index: "02", status: "PRÓXIMAMENTE" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="eyebrow"><span className="colorDash"/> ELIGE TU UNIVERSO</p><h2>¿Dónde empezamos?</h2></div><p>Dos mundos.<br/>La misma forma de crear.</p></div>
    <div className="gameCategories">{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`Explorar ${world.label}`}>
      <div className="gameVisual"><Media src={world.image} alt={`Ilustración de ${world.label}`} sizes="(max-width: 700px) 100vw, 50vw"/><span className="gameShade"/><span className="gameBadge">{world.status === "CATÁLOGO" && <i/>}{world.status}</span><div className="gameTitle"><small>{world.place}</small><h3>{world.label}</h3></div><span className="gameNumber">{world.index}</span></div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
