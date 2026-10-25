import Link from "next/link";
import { getWhatsAppUrl } from "@/data/site";

const steps = [
  {
    number: "01",
    title: "Pick a model",
    description:
      "Choose a model from the shop, including ANC and touch-control earbuds.",
  },
  {
    number: "02",
    title: "Add it to your cart",
    description:
      "Open a model and add it. You can change the quantity before you check out.",
  },
  {
    number: "03",
    title: "Checkout",
    description:
      "Enter your name, phone, and delivery address, then place the order.",
  },
];

export default function OrderSteps() {
  return (
    <section className="border-y border-zinc-200 bg-[#faf8f5] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
            How to order
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Order in three steps
          </h2>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-[1.5rem] border border-zinc-200 bg-white p-6"
            >
              <p className="font-mono text-sm font-medium text-blue-700">
                {step.number}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-6">
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            Shop earbuds
          </Link>
          <a
            href={getWhatsAppUrl(
              "Hi, I would like help choosing wireless earbuds.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
          >
            Ask which model fits
          </a>
        </div>
      </div>
    </section>
  );
}
