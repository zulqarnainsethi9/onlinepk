import { siteConfig } from "@/data/site";

export function formatPrice(amount) {
  if (amount === null || amount === undefined) {
    return "Price on request";
  }

  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
