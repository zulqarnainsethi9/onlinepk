"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export default function AddToCartButton({ product, label = "Add to cart", className = "" }) {
  const { items, addItem } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find((item) => item.id === product.id)?.qty ?? 0;
  const tracksStock = typeof product.stock === "number";
  const soldOut = tracksStock && product.stock < 1;
  const atLimit = tracksStock && inCart >= product.stock;
  const unavailable = soldOut || atLimit;

  function handleClick() {
    if (unavailable) return;
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  const text = soldOut ? "Out of stock" : atLimit ? "In cart" : added ? "Added" : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={unavailable}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 disabled:shadow-none",
        className,
      )}
    >
      {text}
    </button>
  );
}
