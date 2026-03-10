import type { Metadata } from "next";
import CartDrawer from "@/components/storefront/CartDrawer";
import StorefrontCartProvider from "@/components/storefront/CartProvider";
import StorefrontTopBar from "@/components/storefront/StorefrontTopBar";

export const metadata: Metadata = {
  title: "Merch Storefronts",
  description:
    "Standalone fashion storefronts for Woronoff, Unity Supply, Moon Spell, Concrete Borough, and Salt Current.",
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontCartProvider>
      <StorefrontTopBar />
      {children}
      <CartDrawer />
    </StorefrontCartProvider>
  );
}
