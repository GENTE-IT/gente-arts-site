import { ImageResponse } from "next/og";
import { SiteImage, OG_SIZE, loadFonts, imageOptions } from "../lib/og";

export const alt = "GENTE.ARTS — Hecho por gente, para tu servidor.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFonts();
  return new ImageResponse(<SiteImage/>, imageOptions(fonts));
}
