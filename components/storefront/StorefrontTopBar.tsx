"use client";

import { useStorefrontCart } from "@/components/storefront/CartProvider";

export default function StorefrontTopBar() {
  const { itemCount, openCart } = useStorefrontCart();

  return (
    <div className="border-b border-neutral-800/10 bg-[#f7f7f5]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 min-h-11 py-2 flex items-center justify-between gap-5">
        <div className="flex items-center gap-4 overflow-x-auto">
          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500 whitespace-nowrap">
            Complimentary shipping over $200
          </p>
          <span className="text-neutral-300">•</span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap">
            Returns within 14 days
          </p>
        </div>
        <button
          onClick={openCart}
          className="text-[10px] uppercase tracking-[0.24em] text-neutral-600 hover:text-neutral-900 whitespace-nowrap"
        >
          Open cart · {itemCount}
        </button>
      </div>
    </div>
  );
}
