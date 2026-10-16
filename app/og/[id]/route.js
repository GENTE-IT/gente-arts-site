import { ImageResponse } from "next/og";
import { products, categoryOf } from "../../../data/products";
import { ProductImage, loadFonts, imageOptions } from "../../../lib/og";

// /og/<product id> — the product thumbnail as a 1200×630 link preview,
// rendered at build time for every product in the catalogue.
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return products.map(product => ({ id: product.id })); }

export async function GET(_, { params }) {
  const { id } = await params;
  const product = products.find(product => product.id === id);
  if (!product) return new Response("Not found", { status: 404 });
  const fonts = await loadFonts();
  return new ImageResponse(<ProductImage product={product} category={categoryOf(product)}/>, imageOptions(fonts));
}
