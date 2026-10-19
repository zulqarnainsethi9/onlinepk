import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}, an online electronics storefront for everyday technology accessories.`,
};

export default function AboutPage() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            About Us
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            A simple online storefront for everyday technology
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600">
            onlineAccessories is an online electronics storefront focused on
            providing convenient access to wireless earbuds and everyday
            technology accessories. We keep the experience clear, mobile-friendly,
            and easy to browse.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Our approach to product selection
          </h2>
          <p className="leading-relaxed text-zinc-600">
            We start with a focused catalog so visitors can review products
            carefully. Each listing highlights practical details such as
            pricing, descriptions, and features confirmed by the product
            information we have available.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Useful everyday technology
          </h2>
          <p className="leading-relaxed text-zinc-600">
            Our focus is on accessible products people can use every day —
            wireless audio and related accessories presented with honest
            information and a professional shopping experience.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Browse Shop</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
