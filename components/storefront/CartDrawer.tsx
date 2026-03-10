"use client";

import Link from "next/link";
import { useState } from "react";
import { formatCurrency, toCheckoutLineInputs } from "@/lib/commerce";
import { useStorefrontCart } from "@/components/storefront/CartProvider";

export default function CartDrawer() {
  const {
    lines,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount,
  } = useStorefrontCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (lines.length === 0) {
      return;
    }

    setIsCheckoutLoading(true);
    setCheckoutMessage("");
    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lines: toCheckoutLineInputs(lines),
        }),
      });
      const payload = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        setCheckoutMessage(payload.error ?? "Checkout is unavailable.");
        return;
      }

      window.location.href = payload.checkoutUrl;
    } catch {
      setCheckoutMessage("Checkout is unavailable.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <>
      {isCartOpen && (
        <button
          aria-label="Close cart"
          onClick={closeCart}
          className="fixed inset-0 z-[70] bg-black/45"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[80] h-full w-full max-w-md bg-[#121315] text-white border-l border-neutral-700/60 transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-5 border-b border-neutral-700/60 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.23em]">Cart · {itemCount}</p>
            <button
              onClick={closeCart}
              className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>

          {lines.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {lines.map((line) => (
                  <article key={line.lineId} className="border border-neutral-700/50 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-300">
                      {line.name}
                    </p>
                    <p className="mt-2 text-xs text-neutral-400">
                      {line.color} · {line.size}
                    </p>
                    <p className="mt-2 text-sm text-white">
                      {formatCurrency(line.unitPrice, line.currency)}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-neutral-600">
                        <button
                          onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                          className="px-3 py-1.5 text-sm text-neutral-300 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-xs text-neutral-300 border-x border-neutral-600">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                          className="px-3 py-1.5 text-sm text-neutral-300 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.lineId)}
                        className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-neutral-700/60 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <Link
                  href="/merch/cart"
                  onClick={closeCart}
                  className="w-full inline-flex justify-center border border-neutral-500 px-4 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-white"
                >
                  Go to cart
                </Link>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className="w-full border border-neutral-700 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:border-neutral-500"
                >
                  {isCheckoutLoading ? "Preparing checkout..." : "Checkout"}
                </button>
                {checkoutMessage && <p className="text-xs text-neutral-500">{checkoutMessage}</p>}
                <button
                  onClick={clearCart}
                  className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white"
                >
                  Clear cart
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <p className="text-lg font-light tracking-tight">Your cart is empty.</p>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Add a product from any storefront to start building your order.
              </p>
              <Link
                href="/merch"
                onClick={closeCart}
                className="mt-6 inline-flex border border-neutral-600 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:border-white hover:text-white"
              >
                Browse brands
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
