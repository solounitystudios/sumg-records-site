"use client";

import { useState } from "react";
import type { StorefrontProduct } from "@/data/types";
import { formatCurrency } from "@/lib/commerce";
import { useStorefrontCart } from "@/components/storefront/CartProvider";

interface ProductPurchasePanelProps {
  product: StorefrontProduct;
  accentColor: string;
  borderColor: string;
  mutedTextColor: string;
}

export default function ProductPurchasePanel({
  product,
  accentColor,
  borderColor,
  mutedTextColor,
}: ProductPurchasePanelProps) {
  const { addItem } = useStorefrontCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  const canAddToCart =
    product.inStock && Boolean(selectedColor) && Boolean(selectedSize) && quantity > 0;

  const handleAddToCart = () => {
    if (!canAddToCart) {
      return;
    }

    addItem({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    setAddedMessage("Added to cart.");
  };

  return (
    <div className="space-y-6">
      <p className="text-2xl tracking-tight" style={{ color: accentColor }}>
        {formatCurrency(product.price, product.currency)}
      </p>

      <div>
        <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: mutedTextColor }}>
          Color
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] border"
              style={{
                borderColor,
                color: selectedColor === color ? accentColor : mutedTextColor,
                backgroundColor: selectedColor === color ? `${accentColor}12` : "transparent",
              }}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: mutedTextColor }}>
          Size
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] border"
              style={{
                borderColor,
                color: selectedSize === size ? accentColor : mutedTextColor,
                backgroundColor: selectedSize === size ? `${accentColor}12` : "transparent",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: mutedTextColor }}>
          Quantity
        </p>
        <div className="mt-3 inline-flex items-center border" style={{ borderColor }}>
          <button
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="px-3 py-2 text-sm"
            style={{ color: mutedTextColor }}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-2 text-sm border-x" style={{ borderColor }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            className="px-3 py-2 text-sm"
            style={{ color: mutedTextColor }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!canAddToCart}
        className="w-full px-6 py-4 text-[11px] uppercase tracking-[0.22em] border disabled:opacity-40"
        style={{ borderColor, color: accentColor }}
      >
        {product.inStock ? "Add to cart" : "Sold out"}
      </button>
      {addedMessage && (
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: mutedTextColor }}>
          {addedMessage}
        </p>
      )}

      <button
        type="button"
        className="w-full px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
        style={{ borderColor, color: mutedTextColor }}
      >
        Checkout (soon)
      </button>
    </div>
  );
}
