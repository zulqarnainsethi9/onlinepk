import ButtonLink from "@/components/ui/ButtonLink";

export default function CallToAction() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] bg-zinc-900 px-6 py-12 text-center sm:px-10 sm:py-14">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to browse our earbuds?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
            Explore current products, compare details, or contact us with a
            product inquiry. We are here to help you choose with confidence.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/shop">Browse Products</ButtonLink>
            <ButtonLink
              href="/contact"
              variant="outline"
              className="border-zinc-600 bg-transparent text-white hover:border-zinc-400 hover:bg-white/10"
            >
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
