"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";

type OrderState = "idle" | "submitting" | "success" | "error";

export function CheckoutForm() {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<OrderState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const clearCart = () => {
    items.forEach((item) => removeItem(item.slug));
  };

  const lineItems = items.map((item) => ({
    productName: item.name,
    quantity: item.quantity,
    price: item.price
  }));

  const canPlaceOrder =
    customerName.trim() && email.trim() && phone.trim() && address.trim() && items.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          address,
          items: lineItems,
          total
        })
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || "Unable to place order.");
      }

      clearCart();
      setStatus("success");
      router.push("/checkout/success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong while placing the order."
      );
    }
  };

  if (items.length === 0) {
    return <div className="empty-card">Your cart is empty. Add items before checkout.</div>;
  }

  return (
    <div className="checkout-layout">
      <form className="panel checkout-form" onSubmit={handleSubmit}>
        <h2>Customer details</h2>
        <label className="form-field">
          <span>Full name</span>
          <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <label className="form-field">
          <span>Delivery address</span>
          <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={4} required />
        </label>
        <div className="panel panel-muted">
          <h3>Order placement</h3>
          <p className="page-copy">
            This checkout places the order directly and saves it in MongoDB for admin review.
            You can confirm payment manually, take cash on delivery, or follow up on WhatsApp.
          </p>
        </div>
        {status === "error" ? <p className="error-text">{errorMessage}</p> : null}
        <button
          type="submit"
          className="button button-primary"
          disabled={!canPlaceOrder || status === "submitting"}
        >
          {status === "submitting" ? "Placing order..." : "Place order"}
        </button>
      </form>

      <aside className="panel">
        <h2>Order summary</h2>
        <div className="stack">
          {items.map((item) => (
            <div key={item.slug} className="summary-row">
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>Rs. {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>Rs. {total.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}
