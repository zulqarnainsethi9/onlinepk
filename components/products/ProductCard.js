import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/80">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[5/4] overflow-hidden bg-white"
      >
        {product.badge ? (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950 shadow-sm">
            {product.badge}
          </span>
        ) : null}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.images?.[0]?.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-zinc-500 uppercase">
            Wireless earbuds
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors hover:text-blue-700"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600">
            {product.shortDescription}
          </p>
          {product.highlights?.length ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-zinc-100 pt-4">
          <p className="text-lg font-semibold text-zinc-950">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock,
            }}
            label="Add"
            className="min-h-10 rounded-full px-4 shadow-none"
          />
        </div>
      </div>
    </article>
  );
}
