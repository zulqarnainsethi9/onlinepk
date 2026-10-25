"use client";

import { useCatalog } from "@/components/catalog/CatalogProvider";
import ProductGrid from "@/components/products/ProductGrid";

export default function ShopCatalog() {
  const { products } = useCatalog();

  return <ProductGrid products={products} />;
}
