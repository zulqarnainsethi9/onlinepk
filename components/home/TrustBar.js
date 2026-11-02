const perks = [
  {
    title: "Prices in PKR",
    description: "The price on the product is the price at checkout.",
  },
  {
    title: "Delivery details",
    description: "Name, phone, city, and address are collected on this site.",
  },
  {
    title: "WhatsApp confirmation",
    description: "We confirm the order with you after checkout.",
  },
  {
    title: "Order tracking",
    description: "Use your order number to see the latest status.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50">
      <ul className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => (
          <li
            key={perk.title}
            className="border-zinc-200 px-5 py-5 sm:px-6 lg:border-l lg:first:border-l-0"
          >
            <p className="text-sm font-semibold text-zinc-950">{perk.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              {perk.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
