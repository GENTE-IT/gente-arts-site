"use client";

import Icon from "../components/Icon";

export default function Error({ retry, reset }) {
  return <main id="contenido" className="errorPage runtimeError">
    <p className="kicker">Pausa inesperada</p>
    <div className="errorSignal" aria-hidden="true"><Icon name="refresh" size={56}/></div>
    <h1>Volvamos a intentarlo.</h1><p>No hemos podido cargar esta parte de la web.<br/>Puedes reintentar o regresar al inicio.</p>
    <div className="errorActions"><button className="button darkButton" onClick={() => (retry || reset)()}>Reintentar <Icon name="refresh"/></button><a className="button outlineButton" href="/">Ir al inicio <Icon name="arrow"/></a></div>
  </main>;
}
