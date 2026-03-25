import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="section">
      <div className="container narrow">
        <div className="panel centered-panel">
          <p className="eyebrow">Order placed</p>
          <h1>Thank you for choosing Shishu Microgreens.</h1>
          <p className="page-copy">
            Your order has been submitted successfully. You can continue shopping or review the
            admin dashboard for incoming orders.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="button button-primary">
              Continue shopping
            </Link>
            <Link href="/admin" className="button button-secondary">
              View admin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
