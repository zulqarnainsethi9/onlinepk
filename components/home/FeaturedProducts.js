"use client";

import Link from "next/link";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ProductGrid from "@/components/products/ProductGrid";

export default function FeaturedProducts() {
  const { products } = useCatalog();
  const list = products || [];

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              The collection
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {list.length
                ? `${list.length} ${list.length === 1 ? "product" : "products"} available now.`
                : "Products will appear here as they are added."}
            </p>
          </div>
          <Link
            href="/shop"
            className="shrink-0 text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            View all
          </Link>
        </div>

        <div className="mt-8">
          <ProductGrid products={list} />
        </div>
      </div>
    </section>
  );
}
