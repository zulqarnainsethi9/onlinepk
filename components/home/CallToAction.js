"use client";

import Image from "next/image";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import ButtonLink from "@/components/ui/ButtonLink";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export default function CallToAction() {
  const { products } = useCatalog();
  const list = products || [];
  const startingPrice = list.length
    ? Math.min(...list.map((product) => product.price))
    : null;

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-zinc-950 text-white">
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                {siteConfig.name}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready when you are.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300">
                {startingPrice == null
                  ? "Browse the models, or send a message if you want help choosing."
                  : `Browse the models from ${formatPrice(startingPrice)}, or send a message if you want help choosing.`}{" "}
                Product photos, prices, and features stay on the page so you
                can decide with the details in front of you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/shop">Browse products</ButtonLink>
                <ButtonLink
                  href={getWhatsAppUrl(
                    "Hi, I want to order wireless earbuds from onlineAccessories.",
                  )}
                  external
                  variant="outline"
                  className="border-zinc-700 bg-transparent text-white hover:border-zinc-500 hover:bg-white/10"
                >
                  WhatsApp {siteConfig.contact.phone}
                </ButtonLink>
              </div>
            </div>

            {list.length > 0 ? (
            <div
              className={
                list.length > 2
                  ? "grid grid-cols-3 gap-3"
                  : "grid grid-cols-2 gap-3"
              }
            >
              {list.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white p-3 text-zinc-950"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.images?.[0]?.alt || product.name}
                      fill
                      sizes="180px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-snug">
                    {product.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {formatPrice(product.price)}
                  </p>
                </div>
              ))}
            </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
