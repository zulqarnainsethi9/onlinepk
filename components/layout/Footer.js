import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="text-xl font-semibold tracking-tight text-zinc-900">
            {siteConfig.name}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-600 transition-colors hover:text-blue-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-blue-600"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-600"
              >
                WhatsApp {siteConfig.contact.phone}
              </a>
            </li>
            <li>{siteConfig.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {siteConfig.name}. All rights reserved.</p>
          <p>Wireless earbuds & everyday electronics accessories.</p>
        </div>
      </div>
    </footer>
  );
}
