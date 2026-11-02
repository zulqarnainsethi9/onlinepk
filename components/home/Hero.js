"use client";

import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ButtonLink from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/utils";

export default function Hero() {
  const { products } = useCatalog();
  const list = products || [];
  const featured = list[0];
  const others = list.slice(1, 3);
  const startingPrice = list.length
    ? Math.min(...list.map((product) => product.price))
    : null;

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8 lg:py-16">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold text-blue-700">
            Wireless earbuds
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Shop everyday earbuds, priced in rupees.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-600">
            {featured
              ? `${list.length} ${list.length === 1 ? "model" : "models"} from ${formatPrice(startingPrice)}. Compare the photos and features, then checkout with your delivery details.`
              : "Compare the photos and features, then checkout with your delivery details."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop">Shop now</ButtonLink>
            <ButtonLink href="/track-parcel" variant="outline">
              Track an order
            </ButtonLink>
          </div>
        </div>

        {featured ? (
          <div
            className={
              others.length
                ? "order-1 grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:order-2"
                : "order-1 lg:order-2"
            }
          >
            <Link
              href={`/products/${featured.slug}`}
              className="group flex min-h-[300px] flex-col rounded-2xl bg-[#e4eaf1] p-5 sm:min-h-[520px]"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-zinc-950">
                  {featured.badge || "Featured"}
                </span>
                <span className="font-semibold text-zinc-950">
                  {formatPrice(featured.price)}
                </span>
              </div>
              <div className="relative mt-4 min-h-0 flex-1">
                <Image
                  src={featured.image}
                  alt={featured.images?.[0]?.alt || featured.name}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="rounded-xl bg-white px-4 py-3">
                <p className="text-xs text-zinc-500">Featured</p>
                <p className="mt-0.5 font-semibold text-zinc-950">
                  {featured.name}
                </p>
              </div>
            </Link>

            {others.length > 0 ? (
              <div className="hidden gap-3 sm:grid sm:grid-rows-2">
                {others.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4"
                  >
                    <div className="relative aspect-square rounded-xl bg-zinc-100">
                      <Image
                        src={product.image}
                        alt={product.images?.[0]?.alt || product.name}
                        fill
                        sizes="220px"
                        className="object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="line-clamp-2 text-sm font-semibold text-zinc-950">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
