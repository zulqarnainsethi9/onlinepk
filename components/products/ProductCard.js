import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg hover:shadow-zinc-200/70">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-zinc-50"
      >
        <Image
          src={product.image}
          alt={product.images?.[0]?.alt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors hover:text-blue-600"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-lg font-semibold text-blue-600">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm leading-relaxed text-zinc-600">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <ButtonLink
            href={`/products/${product.slug}`}
            variant="outline"
            className="w-full"
          >
            View Details
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
