import ProductCard from "@/components/products/ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
