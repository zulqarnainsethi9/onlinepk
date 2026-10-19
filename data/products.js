export const products = [
  {
    id: "air-buds-pro-2-anc",
    slug: "air-buds-pro-2-anc",
    name: "Air Buds Pro 2 ANC",
    price: 1799,
    shortDescription:
      "Wireless earbuds designed for convenient everyday listening.",
    description:
      "Air Buds Pro 2 ANC are wireless earbuds built for daily use. Pair them with the matching charging case for a clean, portable listening setup at home, work, or on the go.",
    image: "/images/air-buds-pro-2-anc.webp",
    images: [
      {
        src: "/images/air-buds-pro-2-anc.webp",
        alt: "Air Buds Pro 2 ANC wireless earbuds floating above open white charging case",
      },
      {
        src: "/images/air-buds-pro-2-anc-2.webp",
        alt: "Air Buds Pro 2 ANC in charging case with grey carrying lanyard",
      },
      {
        src: "/images/air-buds-pro-2-anc-3.webp",
        alt: "Air Buds Pro 2 ANC product set with open case, closed case, and lanyard",
      },
      {
        src: "/images/air-buds-pro-2-anc-4.webp",
        alt: "Close-up of Air Buds Pro 2 ANC wireless earbuds",
      },
    ],
    features: [
      "Wireless in-ear design for everyday listening",
      "Matching charging case with front LED indicator",
      "Soft silicone ear tips for a comfortable fit",
      "Includes a carrying lanyard for the case",
      "Clean, compact form factor for daily use",
    ],
  },
  {
    id: "air-39-wireless-earbuds",
    slug: "air-39-wireless-earbuds",
    name: "Air 39 Wireless Earbuds",
    price: 1199,
    shortDescription: "Wireless stereo earbuds for everyday listening.",
    description:
      "Air 39 Wireless Earbuds deliver a wireless stereo experience with a distinctive transparent charging case and digital battery display. Practical details like Type-C charging and integrated microphones make them a solid everyday option.",
    image: "/images/air-39-wireless-earbuds.webp",
    images: [
      {
        src: "/images/air-39-wireless-earbuds.webp",
        alt: "Air 39 Wireless Earbuds with transparent case showing digital battery display",
      },
      {
        src: "/images/air-39-wireless-earbuds-2.webp",
        alt: "Air 39 Wireless Earbuds above black transparent charging case with LED display",
      },
      {
        src: "/images/air-39-wireless-earbuds-3.webp",
        alt: "Air 39 Wireless Earbuds feature overview including microphones and Type-C charging",
      },
      {
        src: "/images/air-39-wireless-earbuds-4.webp",
        alt: "Air 39 Wireless Earbuds with packaging, charging cable, and case",
      },
    ],
    features: [
      "Wireless stereo earbuds for everyday listening",
      "Transparent charging case with digital LED battery display",
      "Individual left and right earbud charge indicators on the case",
      "ENC support as shown on the product packaging",
      "Bluetooth V 5.3 as shown on the product packaging",
      "Type-C charging port for convenient recharging",
      "Integrated microphones for clear voice calls",
      "Magnetic charging contacts for precise connections",
      "Precision hinge construction on the charging case",
    ],
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) || null;
}

export function getProductSlugs() {
  return products.map((product) => product.slug);
}
