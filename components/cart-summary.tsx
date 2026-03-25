"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export function CartSummary() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="button button-secondary">
      Cart ({itemCount})
    </Link>
  );
}
