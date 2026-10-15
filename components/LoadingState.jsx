import LatticeLoader from "./reactbits/LatticeLoader";
import Figures from "./brand/Figures";

export default function LoadingState({ catalog = false }) {
  return <main className="loadingPage" id="contenido" aria-busy="true">
    <div className="loadingIdentity"><Figures height={64} className="loadingFigures"/><LatticeLoader label={catalog ? "Preparando la colección" : "Abriendo tu universo"} doneLabel="Listo en" errorLabel="Error tras" pattern="orbit" grid={3} shape="round" cellSize={7} gap={3} fontSize={15} showTimer={false}/><p>Un momento, estamos cargando el contenido.</p></div>
    <div className="loadingBanner skeleton" aria-hidden="true"/>
    <div className="loadingLines" aria-hidden="true"><div className="skeleton"/><div className="skeleton"/></div>
    <div className="loadingCards" aria-hidden="true">{[1, 2, 3].map(item => <div key={item}><div className="skeleton"/><span className="skeleton"/></div>)}</div>
  </main>;
}
