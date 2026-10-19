import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-[radial-gradient(circle_at_top_right,_#eff6ff_0%,_#ffffff_45%,_#fafafa_100%)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            {siteConfig.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Wireless earbuds for everyday listening
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600">
            Discover a focused selection of wireless earbuds and electronics
            accessories, presented with clear pricing and product details you
            can trust.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop">Shop Now</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Us
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/50 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-200/60 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-zinc-50">
              <Image
                src="/images/air-buds-pro-2-anc.webp"
                alt="Air Buds Pro 2 ANC wireless earbuds with charging case"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
