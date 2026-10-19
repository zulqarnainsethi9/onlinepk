import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";

export default function BrandIntro() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            About {siteConfig.name}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            A focused storefront for everyday technology
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            onlineAccessories is building a simple, reliable place to browse
            wireless earbuds and electronics accessories. We keep product
            information clear, pricing transparent, and the shopping experience
            easy on every device.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-zinc-600">
            Looking for a specific model or want help choosing between our
            current options? Reach out and we will help you with product
            details.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/about">About Us</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
