import type { CheckoutLineInput } from "@/lib/commerce";
import { isShopifyConfigured, shopifyFetch } from "@/lib/shopify";

interface ShopifyCartResponse {
  cartCreate?: {
    cart?: {
      id: string;
      checkoutUrl: string;
    };
  };
  cartLinesAdd?: {
    cart?: {
      id: string;
      checkoutUrl: string;
    };
  };
}

export async function createShopifyCart(lines: CheckoutLineInput[]) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const mutation = `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const data = await shopifyFetch<ShopifyCartResponse, { lines: CheckoutLineInput[] }>({
    query: mutation,
    variables: { lines },
  });
  return data.cartCreate?.cart ?? null;
}

export async function addLinesToShopifyCart(cartId: string, lines: CheckoutLineInput[]) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const mutation = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const data = await shopifyFetch<
    ShopifyCartResponse,
    { cartId: string; lines: CheckoutLineInput[] }
  >({
    query: mutation,
    variables: {
      cartId,
      lines,
    },
  });
  return data.cartLinesAdd?.cart ?? null;
}
