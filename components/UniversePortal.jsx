import StudioLink from "./StudioLink";
import Icon from "./Icon";
import Logo from "./brand/Logo";

/*
 * The two universes as two flat cards: GTA V in positive (white on Noche),
 * GTA VI in negative (Noche on Papel). In each, our isotipo (the dupla on its
 * raya) stands bottom-left and the pointing figure aims at the game's logo,
 * top-right. `logo` is the game's official logo file; until it is in
 * public/assets/logos the name is set in our own type.
 */
const worlds = [
  { href: "/gta-v", label: "GTA V", logo: null, place: "FiveM · ESX / QBCore", tone: "positive", note: "Ver la tienda", index: "01", status: "Tienda abierta" },
  { href: "/gta-vi", label: "GTA VI", logo: null, place: "En preparación", tone: "negative", note: "Qué estamos preparando", index: "02", status: "Próximamente" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">Elige tu universo</p><h2 data-split>¿Dónde empezamos?</h2></div><p data-reveal>Dos juegos.<br/>La misma forma de trabajar.</p></div>
    <div className="gameCategories" data-reveal-group>{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`${world.note}: ${world.label}`}>
      <div className={`gameVisual gameVisualFlat gameVisual-${world.tone}`} data-img-reveal>
        <span className="gameBadge">{world.tone === "positive" && <i/>}{world.status}</span>
        <div className="gameTitle">{world.logo ? <h3 className="gameLogo"><img src={world.logo} alt={world.label}/></h3> : <h3>{world.label}</h3>}<small>{world.place}</small></div>
        <Logo variant="isotipo" className="gameIsotipo" title=""/>
        <span className="gameNumber">{world.index}</span>
      </div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
