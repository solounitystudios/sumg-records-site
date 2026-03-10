"use client";

import Link from "next/link";
import { useStorefrontCart } from "@/components/storefront/CartProvider";
import { getStorefrontBrands } from "@/lib/storefront";

export default function StorefrontTopBar() {
  const { itemCount, openCart } = useStorefrontCart();
  const brands = getStorefrontBrands();

  return (
    <div className="sticky top-16 z-40 border-b border-neutral-800/15 bg-[#f8f7f3]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 md:px-10 min-h-12 py-2 flex items-center justify-between gap-5">
        <div className="flex items-center gap-4 overflow-x-auto">
          <Link
            href="/merch"
            className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-neutral-900"
          >
            Storefront hub
          </Link>
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/merch/${brand.slug}`}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 whitespace-nowrap"
            >
              {brand.logoWordmark}
              {brand.secondaryMark ? ` (${brand.secondaryMark})` : ""}
            </Link>
          ))}
        </div>
        <button
          onClick={openCart}
          className="text-[10px] uppercase tracking-[0.24em] text-neutral-600 hover:text-neutral-900"
        >
          Cart · {itemCount}
        </button>
      </div>
    </div>
  );
}
