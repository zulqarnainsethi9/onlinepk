"use client";

import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ButtonLink from "@/components/ui/ButtonLink";
import { getWhatsAppUrl } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export default function Hero() {
  const { products } = useCatalog();
  const featured = products?.[0];
  const alternate = products?.[1];
  const startingPrice = featured
    ? Math.min(...products.map((product) => product.price))
    : null;

  return (
    <section className="relative overflow-hidden bg-[#f3efe7]">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#d7e4ff] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#f3d7c4]/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-zinc-700 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available now
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            Wireless earbuds for the day ahead.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600">
            {featured
              ? `${products.length} everyday models, starting at ${formatPrice(startingPrice)}. See the photos, the price in rupees, and the features before you order on WhatsApp.`
              : "See the photos, the price in rupees, and the features before you order on WhatsApp."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop">Shop earbuds</ButtonLink>
            <ButtonLink
              href={getWhatsAppUrl(
                "Hi, I want to order wireless earbuds from onlineAccessories.",
              )}
              external
              variant="outline"
              className="bg-white/80"
            >
              Order on WhatsApp
            </ButtonLink>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-zinc-300/80 pt-6">
            <div>
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Models
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950">
                {featured ? products.length : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                From
              </dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                {startingPrice == null ? "—" : formatPrice(startingPrice)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Pricing
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950">PKR</dd>
            </div>
          </dl>
        </div>

        {featured ? (
        <div className="grid gap-4 sm:grid-cols-5">
          <Link
            href={`/products/${featured.slug}`}
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-4 shadow-xl shadow-zinc-900/5 sm:col-span-3 sm:min-h-[460px] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
                {featured.badge}
              </span>
              <span className="text-sm font-semibold text-zinc-950">
                {formatPrice(featured.price)}
              </span>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-sm flex-1">
              <Image
                src={featured.image}
                alt={featured.images?.[0]?.alt || featured.name}
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Featured
              </p>
              <p className="mt-1 text-lg font-semibold text-zinc-950">
                {featured.name}
              </p>
            </div>
          </Link>

          <div className="grid gap-4 sm:col-span-2">
            <div className="rounded-[1.5rem] bg-zinc-950 px-5 py-5 text-white">
              <p className="text-xs font-medium tracking-[0.16em] text-zinc-400 uppercase">
                Order by message
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug">
                Choose a model, then message us on WhatsApp to place the order.
              </p>
            </div>

            {alternate ? (
              <Link
                href={`/products/${alternate.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/80 bg-white p-4 shadow-lg shadow-zinc-900/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                    {alternate.badge}
                  </span>
                  <span className="text-sm font-semibold text-zinc-950">
                    {formatPrice(alternate.price)}
                  </span>
                </div>
                <div className="relative mt-3 aspect-square">
                  <Image
                    src={alternate.image}
                    alt={alternate.images?.[0]?.alt || alternate.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 240px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-950">
                  {alternate.name}
                </p>
              </Link>
            ) : null}
          </div>
        </div>
        ) : null}
      </div>
    </section>
  );
}
