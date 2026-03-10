import { NextResponse } from "next/server";
import type { CheckoutLineInput } from "@/lib/commerce";
import { createShopifyCart } from "@/lib/shopify/cart";

interface CheckoutPayload {
  lines?: CheckoutLineInput[];
}

export async function POST(request: Request) {
  let payload: CheckoutPayload;
  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload.lines || payload.lines.length === 0) {
    return NextResponse.json({ error: "At least one line is required." }, { status: 400 });
  }

  try {
    const cart = await createShopifyCart(payload.lines);
    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        {
          error:
            "Shopify checkout is not configured yet. Add credentials to enable checkout handoff.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout." },
      { status: 500 },
    );
  }
}
