import ButtonLink from "@/components/ui/ButtonLink";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact onlineAccessories for product inquiries about wireless earbuds and electronics accessories.",
};

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Let&apos;s talk about your product inquiry
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600">
            Have a question about Air Buds Pro 2 ANC, Air 39 Wireless Earbuds,
            Buds Pro 9 TW Wireless Earbuds, or availability? Reach out by email
            or WhatsApp.
          </p>
        </div>

        <div className="mt-10 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Contact information
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            Use the channels below for product inquiries. We will help you with
            details and availability.
          </p>

          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-medium text-zinc-900">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900">Phone / WhatsApp</dt>
              <dd className="mt-1 text-zinc-600">{siteConfig.contact.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900">Availability</dt>
              <dd className="mt-1 text-zinc-600">{siteConfig.contact.hours}</dd>
            </div>
          </dl>

          <ButtonLink href={siteConfig.contact.whatsappUrl} external>
            Message on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
