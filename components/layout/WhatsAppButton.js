import { siteConfig } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with onlineAccessories on WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-6 sm:bottom-6"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.04 3C9.4 3 4 8.3 4 14.84c0 2.08.55 4.1 1.6 5.9L4 29l8.45-1.57a12.1 12.1 0 0 0 3.59.54h.01c6.64 0 12.04-5.3 12.04-11.84C28.09 8.3 22.68 3 16.04 3zm6.98 16.82c-.3.84-1.74 1.54-2.42 1.64-.62.09-1.4.13-2.26-.14-.52-.16-1.18-.38-2.03-.75-3.57-1.54-5.88-5.14-6.06-5.38-.18-.24-1.45-1.93-1.45-3.68s.92-2.61 1.24-2.96c.32-.35.7-.44.94-.44h.68c.22 0 .5-.08.78.6.3.7 1.02 2.48 1.11 2.66.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.15.72.2.35.9 1.48 1.93 2.4 1.33 1.18 2.45 1.55 2.8 1.73.35.18.55.15.76-.09.2-.24.88-1.02 1.11-1.37.24-.35.47-.29.78-.18.32.12 2.02.95 2.37 1.12.35.18.58.26.67.41.09.15.09.87-.21 1.71z" />
      </svg>
    </a>
  );
}
