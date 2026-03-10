"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/commerce";
import { useStorefrontCart } from "@/components/storefront/CartProvider";
import { useCheckout } from "@/components/storefront/useCheckout";

export default function CartPageClient() {
  const { lines, subtotal, removeItem, updateQuantity } = useStorefrontCart();
  const { handleCheckout, checkoutMessage, isCheckoutLoading } = useCheckout(lines);

  if (lines.length === 0) {
    return (
      <section className="bg-[#f7f7f5] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center border border-neutral-800/15 py-12 bg-white">
          <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Cart</p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900">
            Your cart is empty.
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Browse a brand storefront to add products and build your order.
          </p>
          <Link
            href="/merch"
            className="mt-8 inline-flex border border-neutral-800/20 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-700 hover:text-neutral-900 hover:border-neutral-900"
          >
            Return to brand hub
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f7f5] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Cart</p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900">
            Review your selections
          </h1>
          <div className="mt-8 space-y-4">
            {lines.map((line) => (
              <article key={line.lineId} className="border border-neutral-800/15 bg-white p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-800">{line.name}</p>
                <p className="mt-2 text-xs text-neutral-500">
                  {line.color} · {line.size}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-neutral-900">
                    {formatCurrency(line.unitPrice, line.currency)}
                  </p>
                  <div className="inline-flex items-center border border-neutral-800/20">
                    <button
                      onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                      className="px-3 py-1.5"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 border-x border-neutral-800/20 text-sm">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                      className="px-3 py-1.5"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(line.lineId)}
                  className="mt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
                >
                  Remove item
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="border border-neutral-800/15 bg-white p-6 h-fit">
          <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">Order summary</p>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="text-neutral-900">{formatCurrency(subtotal)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="mt-6 w-full border border-neutral-900 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-900 disabled:opacity-50"
          >
            {isCheckoutLoading ? "Preparing checkout..." : "Proceed to checkout"}
          </button>
          <p className="mt-3 text-xs text-neutral-500">Secure checkout opens in a new step.</p>
          {checkoutMessage && <p className="mt-2 text-xs text-neutral-600">{checkoutMessage}</p>}
        </aside>
      </div>
    </section>
  );
}
