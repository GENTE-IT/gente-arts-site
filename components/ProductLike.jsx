"use client";

import PulseHeart from "./reactbits/PulseHeart";
import { useShop } from "./ShopProvider";

/*
 * "Me gusta" for a product. The count starts from the product's seed and the
 * user's own likes live in this browser (same store as the cart).
 */
export default function ProductLike({ product, size = 22, light = false }) {
  const { isLiked, likeCount, toggleLike } = useShop();
  return <PulseHeart
    liked={isLiked(product.id)}
    count={likeCount(product)}
    onChange={liked => toggleLike(product.id, liked)}
    size={size}
    corner={999}
    likedColor="#e2693f"
    idleColor={light ? "#c9cec4" : "var(--muted)"}
    pillColor={light ? "#ffffff1f" : "var(--paper-2)"}
    textColor={light ? "#ffffff" : "var(--ink)"}
    label={`Me gusta ${product.name}`}
  />;
}
