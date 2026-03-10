import Link from "next/link";
import MediaTile from "@/components/MediaTile";
import type { StorefrontProduct } from "@/data/types";
import { formatCurrency } from "@/lib/commerce";

interface ProductCardProps {
  product: StorefrontProduct;
  href: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
}

export default function ProductCard({
  product,
  href,
  textColor,
  mutedTextColor,
  borderColor,
}: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="border-t pt-4" style={{ borderColor }}>
        <MediaTile
          src={product.images[0]}
          alt={product.name}
          label={product.name}
          className="aspect-[3/4]"
          sizes="(max-width: 1024px) 50vw, 24vw"
        />
        <p
          className="mt-4 text-[10px] uppercase tracking-[0.23em]"
          style={{ color: mutedTextColor }}
        >
          {product.category}
        </p>
        <h3 className="mt-2 text-lg tracking-tight" style={{ color: textColor }}>
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: mutedTextColor }}>
          {product.description}
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: textColor }}>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="line-through mr-2 opacity-60">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </span>
          )}
          {formatCurrency(product.price, product.currency)} · {product.inStock ? "In stock" : "Sold out"}
        </p>
        {product.featured && (
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: mutedTextColor }}>
            Featured
          </p>
        )}
      </article>
    </Link>
  );
}
