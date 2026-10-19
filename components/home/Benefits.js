import SectionHeading from "@/components/ui/SectionHeading";

const benefits = [
  {
    title: "Wireless convenience",
    description:
      "Move freely while listening, without being tied to a cable during everyday activities.",
    icon: (
      <path d="M8 12a4 4 0 0 1 8 0M5 9a7 7 0 0 1 14 0M12 16v3m-3 0h6" />
    ),
  },
  {
    title: "Comfortable design",
    description:
      "In-ear shapes and soft tips designed for practical daily wear and a secure feel.",
    icon: (
      <path d="M12 21c4.5-2.5 7-6 7-10a7 7 0 1 0-14 0c0 4 2.5 7.5 7 10z" />
    ),
  },
  {
    title: "Everyday usability",
    description:
      "Simple charging cases and portable setups that fit naturally into your routine.",
    icon: (
      <path d="M8 7h8v10H8zM11 3h2v4h-2zM11 17h2v4h-2z" />
    ),
  },
];

export default function Benefits() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why wireless"
          title="Built for everyday listening"
          description="Practical benefits that matter when choosing wireless earbuds for work, travel, and downtime."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  {benefit.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
