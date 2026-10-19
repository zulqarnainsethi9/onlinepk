import ProductGrid from "@/components/products/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/ButtonLink";
import { getAllProducts } from "@/data/products";

export default function FeaturedProducts() {
  const products = getAllProducts();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title="Our current collection"
          description="Two carefully selected wireless earbud models available now through onlineAccessories."
        />
        <ProductGrid products={products} />
        <div className="flex justify-center">
          <ButtonLink href="/shop" variant="outline">
            View All Products
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
