import StudioLink from "../../components/StudioLink";
import Icon from "../../components/Icon";

export const metadata = { title: "Ayuda — GENTE.ARTS", description: "Resuelve tus dudas sobre la colección, disponibilidad y licencias de GENTE.ARTS.", alternates: { canonical: "/ayuda" } };

const questions = [
  ["¿Ya puedo comprar?", "Estamos preparando la apertura. Puedes explorar el catálogo de muestra y guardar recursos en tu cesta. Por ahora no se realizan pagos ni se entregan archivos desde la web."],
  ["¿Qué hay en la colección?", "La colección está organizada en mapeados, scripts, ropa y sistemas para GTA V. Puedes filtrar por tipo, buscar un nombre o comparar los precios de muestra."],
  ["¿Qué necesito para usar un recurso?", "Los requisitos dependen de cada producto y del entorno de tu servidor. Antes de una compra, consulta la compatibilidad, las dependencias y los detalles técnicos con el estudio."],
  ["¿Cuándo llega GTA VI?", "Todavía no hemos anunciado una fecha. La página de GTA VI recogerá la colección cuando esté disponible."],
  ["¿Dónde se guarda mi cesta?", "Tu selección se guarda en este navegador para que puedas retomarla después. No se crea una cuenta ni se envían esos datos al estudio. Si borras los datos del navegador, se eliminará la selección."],
  ["¿Puedo proponer algo a medida?", "Sí. Escríbenos a hola@gente.arts con tu idea, el entorno en el que quieres usarla y las referencias que tengas. Podremos conversar sobre el alcance y la disponibilidad."],
];

export default function Help() {
  return <main id="contenido" className="helpPage">
    <StudioLink className="textLink" href="/"><Icon name="back" size={16}/> Volver al estudio</StudioLink>
    <div className="helpIntro"><p className="eyebrow"><span className="colorDash"/> ESTAMOS AL OTRO LADO</p><h1>Las cosas,<br/><em>claras.</em></h1><p>Unas respuestas para que puedas seguir creando.</p></div>
    <section className="helpLayout"><div><p className="eyebrow">01 / PREGUNTAS FRECUENTES</p><h2>Antes de empezar.</h2></div><div className="faqList">{questions.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" size={18}/></summary><p>{answer}</p></details>)}</div></section>
    <section className="helpLayout licenseSection" id="licencias"><div><p className="eyebrow">02 / USO Y LICENCIAS</p><h2>Cada recurso,<br/>sus condiciones.</h2></div><div><p>La licencia, el alcance de uso y las condiciones de cada producto se comunicarán antes de habilitar su compra. La información de esta colección es una vista previa y no constituye una licencia de uso.</p><p>Si tienes un caso concreto —varios servidores, modificaciones o un proyecto a medida—, consúltalo con el estudio.</p><a className="button darkButton" href="mailto:hola@gente.arts?subject=Consulta%20sobre%20licencias">Consultar una licencia <Icon name="diagonal"/></a></div></section>
  </main>;
}
