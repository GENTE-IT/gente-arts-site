export default function LoadingState({ catalog = false }) {
  return <main className="loadingPage" id="contenido" aria-busy="true">
    <div className="loadingIdentity" role="status"><span className="brandLoader" aria-hidden="true"><i/><i/><i/></span><p>{catalog ? "Preparando la colección" : "Abriendo tu universo"}<span>Un momento, estamos cargando el contenido.</span></p></div>
    <div className="loadingBanner skeleton" aria-hidden="true"/>
    <div className="loadingLines" aria-hidden="true"><div className="skeleton"/><div className="skeleton"/></div>
    <div className="loadingCards" aria-hidden="true">{[1, 2, 3].map(item => <div key={item}><div className="skeleton"/><span className="skeleton"/></div>)}</div>
  </main>;
}
