import ShopCatalog from "@/components/products/ShopCatalog";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Shop",
  description:
    "Browse wireless earbuds available from onlineAccessories, with clear pricing in Pakistani rupees.",
};

export default function ShopPage() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Shop"
          title="Wireless earbuds"
          description="Explore our current products. Select a model to view images, pricing, and confirmed features."
        />
        <ShopCatalog />
      </div>
    </section>
  );
}
