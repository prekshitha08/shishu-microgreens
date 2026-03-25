import { CheckoutForm } from "@/components/checkout-form";

export const metadata = {
  title: "Checkout | Shishu Microgreens"
};

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Checkout</p>
        <h1 className="page-title">Complete your order</h1>
        <p className="page-copy">
          Fill in your delivery details below. Orders will be stored in MongoDB once your
          database connection is configured.
        </p>
        <CheckoutForm />
      </div>
    </section>
  );
}
