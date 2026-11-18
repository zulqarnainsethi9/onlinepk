import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Choose a product",
    description: "Open a model, check the photos, and add it to your cart.",
  },
  {
    number: "2",
    title: "Enter delivery details",
    description: "Add your name, phone, city, and address at checkout.",
  },
  {
    number: "3",
    title: "Track the order",
    description: "Keep the order number. Status updates appear on the track page.",
  },
];

export default function OrderSteps() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              How ordering works
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
              The same path as a normal shop: pick a product, checkout, then follow the order.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            Start shopping
          </Link>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
