"use client";

import { useCart } from "@/components/cart-context";
import type { ProductRecord } from "@/lib/types";

export function AddToCartButton({ product }: { product: ProductRecord }) {
  const { addItem } = useCart();

  return (
    <button type="button" className="button button-primary" onClick={() => addItem(product)}>
      Add to cart
    </button>
  );
}
