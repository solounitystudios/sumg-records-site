"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CartLineItem, StorefrontProduct } from "@/data/types";

const CART_STORAGE_KEY = "fashion-storefront-cart-v1";

interface AddCartItemPayload {
  product: StorefrontProduct;
  color: string;
  size: string;
  quantity: number;
}

interface StorefrontCartContextValue {
  lines: CartLineItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  addItem: (payload: AddCartItemPayload) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const StorefrontCartContext = createContext<StorefrontCartContextValue | null>(null);

function createLineId(product: StorefrontProduct, color: string, size: string) {
  return `${product.brandSlug}:${product.slug}:${color}:${size}`;
}

function readStoredCart(): CartLineItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLineItem[]) : [];
  } catch {
    return [];
  }
}

export default function StorefrontCartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const hasHydrated = useRef(false);

  useEffect(() => {
    const stored = readStoredCart();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(stored);
    hasHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((payload: AddCartItemPayload) => {
    const safeQuantity = Math.max(1, Math.min(10, Math.floor(payload.quantity)));
    const lineId = createLineId(payload.product, payload.color, payload.size);

    setLines((previous) => {
      const existingLine = previous.find((line) => line.lineId === lineId);
      if (existingLine) {
        return previous.map((line) =>
          line.lineId === lineId
            ? { ...line, quantity: Math.min(10, line.quantity + safeQuantity) }
            : line,
        );
      }

      return [
        ...previous,
        {
          lineId,
          brandSlug: payload.product.brandSlug,
          productSlug: payload.product.slug,
          name: payload.product.name,
          unitPrice: payload.product.price,
          currency: payload.product.currency,
          color: payload.color,
          size: payload.size,
          image: payload.product.images[0],
          quantity: safeQuantity,
        },
      ];
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setLines((previous) => previous.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    const nextQuantity = Math.max(1, Math.min(10, Math.floor(quantity)));
    setLines((previous) =>
      previous.map((line) =>
        line.lineId === lineId ? { ...line, quantity: nextQuantity } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<StorefrontCartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

    return {
      lines,
      itemCount,
      subtotal,
      isCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    };
  }, [addItem, clearCart, closeCart, isCartOpen, lines, openCart, removeItem, updateQuantity]);

  return (
    <StorefrontCartContext.Provider value={value}>{children}</StorefrontCartContext.Provider>
  );
}

export function useStorefrontCart() {
  const context = useContext(StorefrontCartContext);
  if (!context) {
    throw new Error("useStorefrontCart must be used within StorefrontCartProvider");
  }

  return context;
}
