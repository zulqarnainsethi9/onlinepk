"use client";

import Link from "next/link";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ProductGrid from "@/components/products/ProductGrid";

export default function FeaturedProducts() {
  const { products } = useCatalog();

  return (
    <section className="border-y border-zinc-200 bg-[#faf8f5] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
              In the store
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Current earbuds
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              Compare the case, the price, and the confirmed features. Open a
              model when you are ready to order.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            Go to shop
          </Link>
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
