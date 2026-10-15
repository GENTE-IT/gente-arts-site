import StudioLink from "../components/StudioLink";
import Icon from "../components/Icon";

export const metadata = { title: "404 — Fuera del mapa" };

export default function NotFound() {
  return <main className="errorPage" id="contenido">
    <p className="eyebrow"><span className="colorDash"/> COORDENADAS DESCONOCIDAS</p>
    <div className="errorArt" aria-hidden="true"><span>4</span><div className="errorOrb"><i/></div><span>4</span><small>OUT OF MAP</small></div>
    <h1>Te has salido del mapa.</h1><p>Esta página no existe o ha cambiado de lugar.<br/>Tu próximo universo está a un clic.</p>
    <div className="errorActions"><StudioLink className="button darkButton" href="/">Volver al inicio <Icon name="back"/></StudioLink><StudioLink className="button outlineButton" href="/gta-v">Explorar GTA V <Icon name="diagonal"/></StudioLink></div>
  </main>;
}
