export const siteConfig = {
  name: "onlineAccessories",
  tagline: "Everyday wireless audio, delivered with care.",
  description:
    "onlineAccessories is an online electronics storefront focused on convenient access to wireless earbuds and everyday technology accessories.",
  url: "https://onlineaccessories.pk",
  currency: "PKR",
  locale: "en-PK",
  contact: {
    email: "onlineAccessories03@gmail.com",
    phone: "+92 316 6566517",
    phoneRaw: "923166566517",
    whatsapp: "923166566517",
    whatsappUrl: "https://wa.me/923166566517",
    hours: "Available for product inquiries",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Track", href: "/track-parcel" },
    { label: "Contact", href: "/contact" },
  ],
  announcement: "Free delivery updates coming soon — browse our wireless earbuds today.",
};

export function getWhatsAppUrl(message = "") {
  const base = siteConfig.contact.whatsappUrl;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
