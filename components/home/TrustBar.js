const perks = [
  {
    title: "Prices in rupees",
    description: "Each model shows its PKR price before you enquire.",
    icon: (
      <path d="M12 3v18M7 7.5c1.2-1.4 2.5-2 5-2 3.2 0 5 1.4 5 3.6 0 4.4-10 2.2-10 6.6C7 18.6 8.8 20 12 20c2.6 0 4.2-.8 5.4-2.2" />
    ),
  },
  {
    title: "Order on WhatsApp",
    description: "Message us with the model you want and we will help you order.",
    icon: (
      <path d="M8 10h8M8 14h5M6 5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3v-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    ),
  },
  {
    title: "Photos on every model",
    description: "Open a product to see the case, earbuds, and included extras.",
    icon: (
      <path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    ),
  },
  {
    title: "Charging case included",
    description: "Both pairs come with a case made for everyday carry.",
    icon: <path d="M7 8h10v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8zm3-3h4v3h-4V5z" />,
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => (
          <div key={perk.title} className="bg-white px-5 py-6 sm:px-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3efe7] text-zinc-900">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {perk.icon}
              </svg>
            </div>
            <p className="text-sm font-semibold text-zinc-950">{perk.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              {perk.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
