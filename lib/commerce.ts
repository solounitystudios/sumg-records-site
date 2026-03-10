import type { CartLineItem } from "@/data/types";

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CheckoutLineInput {
  merchandiseId: string;
  quantity: number;
}

export function toCheckoutLineInputs(lines: CartLineItem[]): CheckoutLineInput[] {
  return lines.map((line) => ({
    // Future Shopify mapping target: ProductVariant.id
    merchandiseId: `${line.brandSlug}:${line.productSlug}:${line.color}:${line.size}`,
    quantity: line.quantity,
  }));
}
