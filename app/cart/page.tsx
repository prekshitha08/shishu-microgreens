"use client";

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="section">
      <div className="container narrow">
        <p className="eyebrow">Cart</p>
        <h1 className="page-title">Review your order</h1>
        {items.length === 0 ? (
          <div className="empty-card">Your cart is empty.</div>
        ) : (
          <div className="stack">
            {items.map((item) => (
              <article key={item.slug} className="cart-row">
                <div>
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price.toFixed(2)}</p>
                </div>
                <div className="cart-actions">
                  <input
                    aria-label={`Quantity for ${item.name}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.slug, Number(event.target.value))
                    }
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => removeItem(item.slug)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
            <div className="summary-card">
              <strong>Total: Rs. {total.toFixed(2)}</strong>
              <p>Review your items, then continue to customer details and order placement.</p>
              <Link href="/checkout" className="button button-primary">
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
