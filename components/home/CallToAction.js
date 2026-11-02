"use client";

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
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p className="text-sm text-zinc-400">{siteConfig.name}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {startingPrice == null
              ? "Browse the shop when you are ready."
              : `Earbuds from ${formatPrice(startingPrice)}.`}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-300">
            Need help choosing a model? Message us and we will point you to the right one.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Shop now</ButtonLink>
          <ButtonLink
            href={getWhatsAppUrl(
              "Hi, I want help choosing wireless earbuds from onlineAccessories.",
            )}
            external
            variant="outline"
            className="border-zinc-700 bg-transparent text-white hover:border-zinc-500 hover:bg-white/10"
          >
            Message on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
