import Image from "next/image";
import Brand from "../components/Brand";
import StoreFront from "../components/StoreFront";
import { products } from "../data/products";

export default function Home() {
  return <>
    <div className="announcement">ENTREGA INMEDIATA <i/> ACTUALIZACIONES INCLUIDAS <i/> SOPORTE DIRECTO</div>
    <header className="siteHeader">
      <Brand />
      <nav aria-label="Navegación principal"><a href="#tienda">Tienda</a><a href="#gta-v">GTA V</a><a href="#gta-vi">GTA VI</a></nav>
      <a className="headerContact" href="#soporte">CONTACTO ↗</a>
    </header>
    <main id="top">
      <section className="hero" id="gta-v">
        <Image className="heroImage" src="/assets/gta-v-wide.jpg" alt="Ilustración promocional oficial de GTA V con Franklin, Michael y Trevor" fill loading="eager" sizes="100vw" />
        <div className="heroShade" />
        <div className="heroCopy"><p className="kicker"><span/> GENTE.ARTS / GTA V</p><h1>Construye<br/><em>tu mundo.</em></h1><p>Scripts, mapeados y sistemas preparados para servidores que quieren tener identidad propia.</p><a className="button light" href="#tienda">EXPLORAR COLECCIÓN <b>↘</b></a></div>
        <div className="heroCorner"><span>UNOFFICIAL MODDING STORE</span><span>LOS SANTOS / 2026</span></div>
      </section>

      <section className="intro"><div className="introIndex">01 / STORE</div><h2>Todo lo que<br/>necesita tu <i>servidor.</i></h2><p>Una tienda construida para crecer contigo. Compra una vez, instala con claridad y sigue creando.</p></section>
      <StoreFront products={products} />

      <section className="featureSplit">
        <div className="featureArt"><Image src="/assets/gta-v-art.jpg" alt="Ilustración oficial de los protagonistas de GTA V" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="featureCopy"><p className="kicker dark"><span/> ECOSISTEMA GTA V</p><h2>Hecho para<br/>encajar.</h2><p>Productos modulares, documentación directa y una base técnica pensada para combinar cada pieza sin fricción.</p><dl><div><dt>01</dt><dd>Compra una vez</dd></div><div><dt>∞</dt><dd>Actualizaciones</dd></div><div><dt>24H</dt><dd>Soporte directo</dd></div></dl></div>
      </section>

      <section className="gtaSix" id="gta-vi">
        <Image src="/assets/gta-vi-art.jpg" alt="Ilustración promocional oficial de GTA VI" fill sizes="100vw" />
        <div className="sixShade"/><div className="sixCopy"><p className="kicker"><span/> NEXT UNIVERSE</p><h2>GTA VI</h2><div><strong>PRÓXIMAMENTE</strong><p>La próxima generación de recursos GENTE.ARTS está tomando forma.</p></div><div className="notifyForm"><input type="email" aria-label="Correo electrónico" placeholder="TU EMAIL"/><button type="button">AVÍSAME ↗</button></div></div>
      </section>

      <section className="support" id="soporte"><p className="kicker dark"><span/> CUSTOM WORK</p><h2>¿Buscas algo<br/>que aún no existe?</h2><a className="button darkButton" href="mailto:hola@gente.arts">HABLEMOS <b>↗</b></a></section>
    </main>
    <footer><Brand footer/><div><h3>CATÁLOGO</h3><a href="#tienda">Productos</a><a href="#gta-v">GTA V</a><a href="#gta-vi">GTA VI</a></div><div><h3>AYUDA</h3><a href="#soporte">Soporte</a><a href="#">Licencias</a><a href="#">FAQ</a></div><p>GENTE.ARTS es una tienda independiente y no está afiliada con Rockstar Games ni Take-Two Interactive. Ilustraciones promocionales © Rockstar Games.</p></footer>
  </>;
}
