"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import type { ProductRecord } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: ProductRecord }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const addSelectedQuantity = () => {
    for (let index = 0; index < quantity; index += 1) {
      addItem(product);
    }
  };

  const handleBuyNow = () => {
    addSelectedQuantity();
    router.push("/cart");
  };

  return (
    <div className="purchase-panel">
      <label className="quantity-field">
        <span>Quantity</span>
        <input
          type="number"
          min={1}
          max={Math.max(product.inventory, 1)}
          value={quantity}
          onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
        />
      </label>
      <div className="hero-actions">
        <button type="button" className="button button-primary" onClick={addSelectedQuantity}>
          Add to cart
        </button>
        <button type="button" className="button button-secondary" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>
    </div>
  );
}
