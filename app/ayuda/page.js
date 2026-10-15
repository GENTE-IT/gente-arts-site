import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";
import ScrollMotion from "../../components/motion/ScrollMotion";

export const metadata = { title: "Ayuda", description: "Resuelve tus dudas sobre la colección, disponibilidad y licencias de GENTE.ARTS.", alternates: { canonical: "/ayuda" } };

const questions = [
  ["¿Ya puedo comprar?", "Estamos preparando la apertura. Puedes explorar las tarjetas y guardar las que te interesen en tu cesta. Por ahora no se realizan pagos ni se activan tarjetas desde la web."],
  ["¿Qué es una tarjeta de acceso?", "Es la forma en que vendemos cada recurso. Compras la tarjeta, la activas con su clave y queda ligada a tu servidor: desde ese momento puedes descargar los archivos, la documentación y las actualizaciones de esa versión."],
  ["¿Qué hay en la colección?", "Siete tarjetas de acceso para GTA V: mapeados, scripts, sistemas y ropa. Cada una incluye los archivos, la documentación y las actualizaciones de su versión."],
  ["¿Qué necesito para usar un recurso?", "Los requisitos dependen de cada producto y del entorno de tu servidor. Antes de una compra, consulta la compatibilidad, las dependencias y los detalles técnicos con el estudio."],
  ["¿Cuándo llega GTA VI?", "Todavía no hemos anunciado una fecha. La página de GTA VI recogerá la colección cuando esté disponible."],
  ["¿Dónde se guarda mi cesta?", "Tu selección se guarda en este navegador para que puedas retomarla después. No se crea una cuenta ni se envían esos datos al estudio. Si borras los datos del navegador, se eliminará la selección."],
  ["¿Puedo proponer algo a medida?", "Sí. Escríbenos a hola@gente.arts con tu idea, el entorno en el que quieres usarla y las referencias que tengas. Podremos conversar sobre el alcance y la disponibilidad."],
];

export default function Help() {
  return <main id="contenido" className="helpPage">
    <StudioLink className="textLink" href="/" data-reveal="fade"><Icon name="back" size={16}/> Volver al estudio</StudioLink>
    <div className="helpIntro"><p className="kicker" data-reveal="fade">Estamos al otro lado</p><h1 data-split>Las cosas, claras.</h1><p data-reveal>Unas respuestas para que puedas seguir creando.</p></div>
    <section className="helpLayout"><div data-reveal><p className="kicker">01 · Preguntas frecuentes</p><h2>Antes de empezar.</h2></div><div className="faqList" data-reveal-group>{questions.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" size={18}/></summary><p>{answer}</p></details>)}</div></section>
    <section className="helpLayout licenseSection" id="licencias"><div data-reveal><p className="kicker">02 · Uso y licencias</p><h2>Cada recurso,<br/>sus condiciones.</h2></div><div data-reveal-group><p>La licencia, el alcance de uso y las condiciones de cada producto se comunicarán antes de habilitar su compra. La información de esta colección es una vista previa y no constituye una licencia de uso.</p><p>Si tienes un caso concreto —varios servidores, modificaciones o un proyecto a medida—, consúltalo con el estudio.</p><a className="button darkButton" href="mailto:hola@gente.arts?subject=Consulta%20sobre%20licencias">Consultar una licencia <Icon name="diagonal"/></a></div></section>
    <ScrollMotion/>
  </main>;
}
