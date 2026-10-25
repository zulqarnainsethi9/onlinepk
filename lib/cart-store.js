const STORAGE_KEY = "oa-cart";
const EMPTY_CART = [];

let items = EMPTY_CART;
let hydrated = false;
const listeners = new Set();

function isCartItem(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.image === "string" &&
    typeof item.qty === "number" &&
    item.qty > 0
  );
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    items = Array.isArray(parsed) ? parsed.filter(isCartItem) : EMPTY_CART;
  } catch {
    items = EMPTY_CART;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function write(next) {
  items = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emit();
}

export const cartStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    hydrate();
    return items;
  },
  getServerSnapshot() {
    return EMPTY_CART;
  },
  add(product) {
    const current = cartStore.getSnapshot();
    const existing = current.find((item) => item.id === product.id);
    const next = existing
      ? current.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, 20) }
            : item,
        )
      : [
          ...current,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1,
          },
        ];

    write(next);
  },
  setQty(id, qty) {
    const current = cartStore.getSnapshot();
    const next =
      qty < 1
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, qty: Math.min(qty, 20) } : item,
          );

    write(next);
  },
  remove(id) {
    write(cartStore.getSnapshot().filter((item) => item.id !== id));
  },
  clear() {
    write([]);
  },
};
