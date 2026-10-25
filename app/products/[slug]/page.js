import { Suspense } from "react";
import ProductDetail from "@/components/products/ProductDetail";

export const metadata = {
  title: "Product",
  description: "Product details, price, and photos from onlineAccessories.",
};

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <section className="py-16">
          <p className="mx-auto max-w-6xl px-4 text-sm text-zinc-500 sm:px-6 lg:px-8">
            Loading product…
          </p>
        </section>
      }
    >
      <ProductDetail />
    </Suspense>
  );
}
