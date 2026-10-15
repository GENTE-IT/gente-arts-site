import Icon from "./Icon";
import { socials } from "../data/site";

/*
 * Round social buttons. `compact` shows icons only (header, menu); the full
 * variant adds the handle next to the icon (footer).
 */
export default function SocialLinks({ compact = false, className = "" }) {
  return <ul className={`socialLinks ${compact ? "socialCompact" : ""} ${className}`} aria-label="Redes sociales">
    {socials.map(social => <li key={social.id}><a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} de GENTE.ARTS`} data-magnetic><Icon name={social.id} size={18}/>{!compact && <span>{social.label}</span>}</a></li>)}
  </ul>;
}
