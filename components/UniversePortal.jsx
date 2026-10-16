import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";
import Logo from "./brand/Logo";

/*
 * The two universes as two cards with volume (border and shadow so they stand
 * off the page in both themes). GTA V is the negative card: Noche on white,
 * the game's name set in our type top-right. GTA VI carries the artwork the
 * studio chose (the VI logo is part of it), darkened at the bottom. In both,
 * our isotipo stands bottom-left with the pointing figure aimed at the logo.
 */
const worlds = [
  { href: "/gta-v", label: "GTA V", image: null, tone: "negative", place: "FiveM · ESX / QBCore", note: "Ver la tienda", index: "01", status: "Tienda abierta" },
  { href: "/gta-vi", label: "GTA VI", image: "/assets/gta-vi-card.jpg", tone: "art", place: "En preparación", note: "Qué estamos preparando", index: "02", status: "Próximamente" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">Elige tu universo</p><h2 data-split>¿Dónde empezamos?</h2></div><p data-reveal>Dos juegos.<br/>La misma forma de trabajar.</p></div>
    <div className="gameCategories" data-reveal-group>{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`${world.note}: ${world.label}`}>
      <div className={`gameVisual gameVisual-${world.tone}`} data-parallax-box data-img-reveal>
        {world.image && <><Media src={world.image} alt={`Ilustración de ${world.label}`} sizes="(max-width: 700px) 100vw, 50vw" parallax={0.06} position="50% 50%"/><span className="gameShade"/></>}
        <span className="gameBadge">{world.tone !== "negative" && <i/>}{world.status}</span>
        <div className="gameTitle">{world.image ? <h3 className="srOnly">{world.label}</h3> : <h3>{world.label}</h3>}<small>{world.place}</small></div>
        <Logo variant="isotipo" className="gameIsotipo" title=""/>
        <span className="gameNumber">{world.index}</span>
      </div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
