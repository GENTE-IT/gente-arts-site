import StudioLink from "../components/StudioLink";
import Icon from "../components/Icon";
import Figures from "../components/brand/Figures";

export const metadata = { title: "404 — Fuera del mapa" };

export default function NotFound() {
  return <main className="errorPage" id="contenido">
    <p className="kicker">Coordenadas desconocidas</p>
    <div className="errorArt" aria-hidden="true"><span>4</span><Figures className="errorFigures"/><span>4</span><small>Fuera del mapa</small></div>
    <h1>Te has salido del mapa.</h1><p>Esta página no existe o ha cambiado de lugar.<br/>Tu próximo universo está a un clic.</p>
    <div className="errorActions"><StudioLink className="button darkButton" href="/">Volver al inicio <Icon name="back"/></StudioLink><StudioLink className="button outlineButton" href="/gta-v">Explorar GTA V <Icon name="diagonal"/></StudioLink></div>
  </main>;
}
