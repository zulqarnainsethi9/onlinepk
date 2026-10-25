"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { cartStore } from "@/lib/cart-store";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return {
      items,
      count,
      total,
      addItem: cartStore.add,
      setQty: cartStore.setQty,
      removeItem: cartStore.remove,
      clearCart: cartStore.clear,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within CartProvider");
  }
  return cart;
}
