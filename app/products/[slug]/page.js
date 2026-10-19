import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/products/ProductGallery";
import ButtonLink from "@/components/ui/ButtonLink";
import {
  getAllProducts,
  getProductBySlug,
  getProductSlugs,
} from "@/data/products";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = `Hi onlineAccessories, I am interested in ${product.name}.`;
  const otherProducts = getAllProducts().filter((item) => item.slug !== slug);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-zinc-800">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
                {siteConfig.name}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-blue-600">
                {formatPrice(product.price)}
              </p>
              <p className="text-base leading-relaxed text-zinc-600">
                {product.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Features</h2>
              <ul className="mt-3 space-y-2.5">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-600"
                  >
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={getWhatsAppUrl(whatsappMessage)} external>
                Contact Us
              </ButtonLink>
              <ButtonLink href="/shop" variant="outline">
                Back to Shop
              </ButtonLink>
            </div>
          </div>
        </div>

        {otherProducts.length > 0 ? (
          <div className="mt-16 border-t border-zinc-200 pt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              More products
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {otherProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-blue-300"
                >
                  <p className="font-semibold text-zinc-900">{item.name}</p>
                  <p className="mt-1 text-sm text-blue-600">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
