import StudioLink from "./StudioLink";
import Media from "./Media";
import Icon from "./Icon";
import Logo from "./brand/Logo";

/*
 * The two universes as two cards with volume (border and shadow so they stand
 * off the page in both themes). Each carries the artwork the studio chose
 * (the game's logo is part of it), darkened at the bottom; our isotipo stands
 * bottom-left with the pointing figure aimed at the logo. A card without
 * artwork falls back to the negative style: Noche on white, name in our type.
 */
const worlds = [
  { href: "/gta-v", label: "GTA V", image: "/assets/gta-v-logo.jpg", position: "0% 45%", tone: "art", place: "FiveM · ESX / QBCore", note: "Ver la tienda", index: "01", status: "Tienda abierta" },
  { href: "/gta-vi", label: "GTA VI", image: "/assets/gta-vi-palms.jpg", position: "0% 50%", tone: "art", place: "En preparación", note: "Qué estamos preparando", index: "02", status: "Próximamente" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="sectionHeading"><div><p className="kicker" data-reveal="fade">Elige tu universo</p><h2 data-split>¿Dónde empezamos?</h2></div><p data-reveal>Dos juegos.<br/>La misma forma de trabajar.</p></div>
    <div className="gameCategories" data-reveal-group>{worlds.map(world => <StudioLink className="gameCard" href={world.href} key={world.href} aria-label={`${world.note}: ${world.label}`}>
      <div className={`gameVisual gameVisual-${world.tone}`} data-parallax-box data-img-reveal>
        {world.image && <><Media src={world.image} alt={`Ilustración de ${world.label}`} sizes="(max-width: 700px) 100vw, 50vw" position={world.position}/><span className="gameShade"/></>}
        <span className="gameBadge">{world.tone !== "negative" && <i/>}{world.status}</span>
        <div className="gameTitle">{world.image ? <h3 className="srOnly">{world.label}</h3> : <h3>{world.label}</h3>}<small>{world.place}</small></div>
        <Logo variant="isotipo" className="gameIsotipo" title=""/>
        <span className="gameNumber">{world.index}</span>
      </div>
      <div className="gameFoot"><span>{world.note}</span><span className="circleArrow"><Icon name="diagonal"/></span></div>
    </StudioLink>)}</div>
  </section>;
}
