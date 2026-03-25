"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { RazorpayCheckoutButton } from "@/components/razorpay-checkout-button";

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

  const canPay =
    customerName.trim() && email.trim() && phone.trim() && address.trim() && items.length > 0;

  if (items.length === 0) {
    return <div className="empty-card">Your cart is empty. Add items before checkout.</div>;
  }

  return (
    <div className="checkout-layout">
      <form
        className="panel checkout-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
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
          <h3>Payment</h3>
          <p className="page-copy">
            This checkout uses Razorpay Standard Checkout. A Razorpay order is created on the server
            before payment, then the payment signature is verified and the order is saved.
          </p>
        </div>
        {status === "error" ? <p className="error-text">{errorMessage}</p> : null}
        <RazorpayCheckoutButton
          customerName={customerName}
          email={email}
          phone={phone}
          address={address}
          items={lineItems}
          total={total}
          disabled={!canPay || status === "submitting"}
          onSuccess={() => {
            clearCart();
            setStatus("success");
            router.push("/checkout/success");
          }}
        />
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
