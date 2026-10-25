import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
} from "firebase/firestore";
import { products as catalogProducts } from "@/data/products";
import { db } from "@/lib/firebase";

const STORE_BUSINESS_ID = "default";

const builtinIds = new Set(catalogProducts.map((product) => product.id));
const builtinById = new Map(catalogProducts.map((product) => [product.id, product]));

function storeCollection(name) {
  return collection(db, "businesses", STORE_BUSINESS_ID, name);
}

function storeDocument(name, id) {
  return doc(db, "businesses", STORE_BUSINESS_ID, name, id);
}

export const ORDER_STATUSES = [
  "New",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export function mergeCatalog(remoteProducts) {
  const extras = remoteProducts.filter(
    (product) => !builtinIds.has(product.id) && !builtinIds.has(product.slug),
  );
  return [...catalogProducts, ...extras];
}

export function normalizeProduct(id, data) {
  const images =
    Array.isArray(data.images) && data.images.length > 0
      ? data.images
      : data.image
        ? [{ src: data.image, alt: data.name || "Product" }]
        : [];

  return {
    id,
    slug: data.slug || id,
    name: data.name || "Product",
    price: Number(data.price) || 0,
    stock: Number.isInteger(data.stock) ? data.stock : Number(data.stock) || 0,
    badge: data.badge || "",
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    features: Array.isArray(data.features) ? data.features : [],
    image: data.image || images[0]?.src || "",
    images,
    createdAt: data.createdAt || "",
  };
}

export function subscribeProducts(onChange, onError) {
  if (!db) {
    onChange([], false);
    return () => {};
  }

  const productsQuery = query(
    storeCollection("storeProducts"),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(
    productsQuery,
    (snapshot) => {
      onChange(
        snapshot.docs.map((item) => normalizeProduct(item.id, item.data())),
        snapshot.metadata.fromCache,
      );
    },
    onError,
  );
}

function createOrderId() {
  const value = crypto.getRandomValues(new Uint32Array(1))[0] % 900000;
  return `OA-${value + 100000}`;
}

export class OrderError extends Error {
  constructor(message) {
    super(message);
    this.name = "OrderError";
  }
}

export async function placeOrder({ items, customer }) {
  if (!db) {
    throw new OrderError("The shop is not connected yet.");
  }
  if (!items.length) {
    throw new OrderError("Your cart is empty.");
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const id = createOrderId();

    try {
      return await runTransaction(db, async (transaction) => {
        const orderRef = storeDocument("storeOrders", id);
        const trackingRef = storeDocument("storeTracking", id);
        const existingOrder = await transaction.get(orderRef);
        if (existingOrder.exists()) {
          throw new Error("collision");
        }

        const lookups = items.map((item) => {
          const builtin = builtinById.get(item.id);
          if (builtin) return { builtin, item };
          return { ref: storeDocument("storeProducts", item.id), item };
        });
        const productSnaps = [];
        for (const lookup of lookups) {
          productSnaps.push(lookup.ref ? await transaction.get(lookup.ref) : null);
        }

        const pricedItems = [];
        const stockUpdates = [];

        lookups.forEach((lookup, index) => {
          if (lookup.builtin) {
            const product = lookup.builtin;
            pricedItems.push({
              id: product.id,
              slug: product.slug,
              name: product.name,
              qty: lookup.item.qty,
              price: product.price,
              image: product.image,
            });
            return;
          }

          const snapshot = productSnaps[index];
          if (!snapshot.exists()) {
            throw new OrderError(`${lookup.item.name} is no longer available.`);
          }

          const data = snapshot.data();
          const stock = Number(data.stock) || 0;
          if (stock < lookup.item.qty) {
            throw new OrderError(
              stock < 1
                ? `${data.name || lookup.item.name} is out of stock.`
                : `${data.name || lookup.item.name} only has ${stock} left.`,
            );
          }

          pricedItems.push({
            id: lookup.item.id,
            slug: data.slug || lookup.item.slug,
            name: data.name || lookup.item.name,
            qty: lookup.item.qty,
            price: Number(data.price) || 0,
            image: data.image || lookup.item.image,
          });
          stockUpdates.push({
            ref: lookup.ref,
            stock: Math.trunc(stock - lookup.item.qty),
          });
        });

        stockUpdates.forEach((update) => {
          transaction.update(update.ref, { stock: update.stock });
        });

        const order = {
          createdAt: new Date().toISOString(),
          status: "New",
          channel: "Website",
          customer,
          items: pricedItems,
          note: "",
        };

        transaction.set(orderRef, order);
        transaction.set(trackingRef, { status: "New" });

        return {
          id,
          ...order,
          total: pricedItems.reduce(
            (sum, item) => sum + item.price * item.qty,
            0,
          ),
        };
      });
    } catch (error) {
      if (error instanceof Error && error.message === "collision") continue;
      throw error;
    }
  }

  throw new OrderError("Could not place the order. Try again.");
}

export function normalizeOrderId(value) {
  return value.trim().toUpperCase();
}

export async function lookupOrderStatus(value) {
  const id = normalizeOrderId(value);
  if (!/^OA-\d{6}$/.test(id)) {
    return { id, status: null, invalid: true };
  }

  if (!db) {
    throw new OrderError("The shop is not connected yet.");
  }

  const snapshot = await getDoc(storeDocument("storeTracking", id));
  if (!snapshot.exists()) {
    return { id, status: null, invalid: false };
  }

  return { id, status: snapshot.data().status || "New", invalid: false };
}
