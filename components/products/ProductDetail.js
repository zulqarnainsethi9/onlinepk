"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ProductGallery from "@/components/products/ProductGallery";
import ButtonLink from "@/components/ui/ButtonLink";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export default function ProductDetail() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const { products } = useCatalog();

  if (products === null) {
    return (
      <section className="py-16">
        <p className="mx-auto max-w-6xl px-4 text-sm text-zinc-500 sm:px-6 lg:px-8">
          Loading product…
        </p>
      </section>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            Product
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
            This product is not in the store
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600">
            It may have been removed. Browse the current models instead.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  const whatsappMessage = `Hi onlineAccessories, I am interested in ${product.name}.`;
  const otherProducts = products.filter((item) => item.slug !== slug);
  const cartProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
    stock: product.stock,
  };

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
          {product.images?.length ? (
            <ProductGallery images={product.images} productName={product.name} />
          ) : null}

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
              {typeof product.stock === "number" ? (
                <p className="text-sm font-medium text-zinc-500">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>
              ) : null}
              <p className="text-base leading-relaxed text-zinc-600">
                {product.description}
              </p>
            </div>

            {product.features.length > 0 ? (
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
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={cartProduct} className="sm:min-w-40" />
              <ButtonLink href="/checkout" variant="outline">
                Checkout
              </ButtonLink>
              <ButtonLink href={getWhatsAppUrl(whatsappMessage)} external variant="ghost">
                Ask on WhatsApp
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
