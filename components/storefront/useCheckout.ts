"use client";

import { useState } from "react";
import { toCheckoutLineInputs } from "@/lib/commerce";
import type { CartLineItem } from "@/data/types";

export function useCheckout(lines: CartLineItem[]) {
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
        setCheckoutMessage(payload.error ?? "Checkout is currently unavailable.");
        return;
      }

      window.location.href = payload.checkoutUrl;
    } catch {
      setCheckoutMessage("Checkout is currently unavailable.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return { handleCheckout, checkoutMessage, isCheckoutLoading };
}
