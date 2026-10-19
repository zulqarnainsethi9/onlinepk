import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Go Home</ButtonLink>
          <ButtonLink href="/shop" variant="outline">
            Browse Shop
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
