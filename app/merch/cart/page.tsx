import type { Metadata } from "next";
import CartPageClient from "@/components/storefront/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review selected products and proceed to checkout.",
};

export default function MerchCartPage() {
  return <CartPageClient />;
}
