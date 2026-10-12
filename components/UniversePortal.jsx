import Image from "next/image";
import Link from "next/link";
import ScrollWordReveal from "./ScrollWordReveal";

const worlds = [
  { href:"/gta-v", label:"GTA V", image:"/assets/gta-v-art.jpg", note:"EXPLORAR CATÁLOGO", index:"01" },
  { href:"/gta-vi", label:"GTA VI", image:"/assets/gta-vi-art.jpg", note:"PRÓXIMAMENTE", index:"02" },
];

export default function UniversePortal() {
  return <section className="universePortal" id="universos">
    <div className="universeHead"><div><p className="kicker dark"><span/> ELIGE UNIVERSO</p><h2>Dos mundos.<br/><i>Una identidad.</i></h2></div><p className="universeNote">ENTRA EN UN UNIVERSO<br/>PARA VER SU COLECCIÓN</p></div>
    <div className="gameCategories">
      {worlds.map(world=><Link className="gameCard" href={world.href} key={world.href}>
        <Image src={world.image} alt={`Entrar en ${world.label}`} fill sizes="(max-width: 800px) 100vw, 50vw"/>
        <span className="gameShade"/><small>{world.index} / UNIVERSO</small><div><h3>{world.label}</h3><p>{world.note}</p></div><b>↗</b>
      </Link>)}
    </div>
    <ScrollWordReveal />
  </section>;
}
