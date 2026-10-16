import Raya from "./brand/Raya";

// Loading screen (manual, ch. 12 and 16): the raya is the progress bar and
// fills from left to right; the state reads in JetBrains Mono.
export default function LoadingState({ catalog = false }) {
  return <main className="loadingPage" id="contenido" aria-busy="true">
    <div className="loadingIdentity"><p className="kicker">{catalog ? "Cargando la tienda" : "Cargando"}</p><div className="loadingBar" role="progressbar" aria-label="Cargando"><Raya/></div><p>Un momento.</p></div>
    <div className="loadingBanner skeleton" aria-hidden="true"/>
    <div className="loadingLines" aria-hidden="true"><div className="skeleton"/><div className="skeleton"/></div>
    <div className="loadingCards" aria-hidden="true">{[1, 2, 3].map(item => <div key={item}><div className="skeleton"/><span className="skeleton"/></div>)}</div>
  </main>;
}
