/*
 * Logo oficial de GENTE.ARTS: lettering «gente» con «.arts» y la dupla a color con las cuatro bandas.
 * Se sirve como imagen desde public/brand: positivo (tinta Noche) sobre fondos claros, negativo (tinta
 * blanca) sobre oscuros; el isotipo es el mismo en ambos. `x` es la unidad (px o cualquier longitud CSS)
 * y cada versión escala con su factor (--logo-k) para que un mismo `x` dé tamaños coherentes.
 *
 *   horizontal — dupla a la derecha del nombre (cabecera, tarjetas)
 *   principal  — dupla encima del nombre (pie, portadas)
 *   isotipo    — solo la dupla (estados vacíos, 404, decoración)
 *
 * `on`: "auto" sigue el tema (data-theme); "dark" o "light" fuerzan la tinta cuando el fondo no depende
 * del tema (p. ej. una fotografía). No se redibuja ni se recompone: cualquier otra versión es otra imagen.
 */
const ASSETS = {
  horizontal: { light: "/brand/logo-horizontal-positivo.png", dark: "/brand/logo-horizontal-negativo.png", k: 2 },
  principal: { light: "/brand/logo-principal-positivo.png", dark: "/brand/logo-principal-negativo.png", k: 5 },
  isotipo: { light: "/brand/isotipo.png", dark: "/brand/isotipo.png", k: 3 },
};

export default function Logo({ variant = "horizontal", x = 28, on = "auto", className = "", title = "GENTE.ARTS" }) {
  const asset = ASSETS[variant] ?? ASSETS.horizontal;
  const style = { "--x-base": typeof x === "number" ? `${x}px` : x, "--logo-k": asset.k };
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  const classes = `logo logo-${variant} ${on === "auto" ? "" : `logo-on-${on}`} ${className}`;
  return <span className={classes} style={style} {...a11y}>
    {variant === "isotipo"
      ? <img src={asset.light} alt="" className="logoImg" draggable={false}/>
      : <><img src={asset.light} alt="" className="logoImg logoImgLight" draggable={false}/><img src={asset.dark} alt="" className="logoImg logoImgDark" draggable={false}/></>}
  </span>;
}

/** Logo pequeño en línea (tarjetas): la versión horizontal a altura de texto. `mono` = siempre tinta blanca. */
export function Wordmark({ className = "", mono = false }) {
  return <Logo variant="horizontal" x=".55em" on={mono ? "dark" : "auto"} className={className} title=""/>;
}
