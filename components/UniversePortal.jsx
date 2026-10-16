import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";
import Logo from "./brand/Logo";

/*
 * The two universes. In each card our isotipo (the dupla on its raya) stands
 * bottom-left and the pointing figure points up at the game's name, set in
 * our own type. GTA V sits on an in-game capture at sunset, darkened at the
 * bottom (manual, ch. 14); GTA VI is a flat Noche panel: we talk about it in
 * the future and without dates.
 */
const worlds = [
  { href: "/gta-v", label: "GTA V", place: "FiveM · ESX / QBCore", image: "/assets/los-santos-sunset.jpg", note: "Ver la tienda", index: "01", status: "Tienda abierta", position: "50% 55%" },
  { href: "/gta-vi", label: "GTA VI", place: "En preparación", image: null, note: "Qué estamos preparando", index: "02", status: "Próximamente", position: "50% 50%" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">Elige tu universo</p><h2 data-split>¿Dónde empezamos?</h2></div><p data-reveal>Dos juegos.<br/>La misma forma de trabajar.</p></div>
    <div className="gameCategories" data-reveal-group>{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`${world.note}: ${world.label}`}>
      <div className={`gameVisual ${world.image ? "" : "gameVisualFlat"}`} data-parallax-box data-img-reveal>
        {world.image && <Media src={world.image} alt={`Captura de ${world.label} al atardecer`} sizes="(max-width: 700px) 100vw, 50vw" parallax={0.08} position={world.position}/>}
        <span className="gameShade"/>
        <span className="gameBadge">{world.image && <i/>}{world.status}</span>
        <div className="gameTitle"><h3>{world.label}</h3><small>{world.place}</small></div>
        <Logo variant="isotipo" className="gameIsotipo" title=""/>
        <span className="gameNumber">{world.index}</span>
      </div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
